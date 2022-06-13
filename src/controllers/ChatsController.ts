import ChatsAPI from "../api/chats/Chats";
import UserAPI from "../api/user/User";
import {ChatPreviewDefault} from "../pages/chat/fragments/chatPreview/ChatPreview";
import GlobalEventBus from "../utils/GlobalEventBus";
import {randomIntInRange} from "../utils/lodash";
import Store, {StoreEvents} from "../utils/store/Store";
import {WS, WSEvents, WSReadyStates} from "../utils/WS";
import {PopUpEvents} from "./ModalController";
import UserController from "./UserController";
import {chatDeletedError, chatIsDeleted, chatIsCreated, userIsAdded, userAddedError} from "../pages/chat/mocks/";

const {Constants} = require('./../constants');
const reopenWebSocketTimeout = 10000;

class ChatsController {
    api;
    chatSockets;
    user;

    constructor() {
        this.api = ChatsAPI;
        this.chatSockets = {};
        this.user = Store.getState().user;
        Store.set('isMessagesLoading', true);
        this.subscribe();
        if (!this.user.id) {
            UserController.checkUserData();
        }
    }

    subscribe() {
        Store.on(StoreEvents.updated, this.handleStoreUpdate.bind(this));
        GlobalEventBus.on(PopUpEvents.change, this.handleChangeEvent.bind(this));
        GlobalEventBus.on(PopUpEvents.submit, this.handleSubmit.bind(this));
    }

    unSubscribe() {
        Store.off(StoreEvents.updated, this.handleStoreUpdate.bind(this));
        GlobalEventBus.off(PopUpEvents.change, this.handleChangeEvent.bind(this));
        GlobalEventBus.off(PopUpEvents.submit, this.handleSubmit.bind(this));
    }

    onDestroy() {
        for (let key in this.chatSockets) {
            this.chatSockets[key].close();
        }
        this.unSubscribe();
    }

    async handleSubmit({data, type}) {
        if (type === 'add-chat') {
            GlobalEventBus.emit(PopUpEvents.hide);
            await this.create(data.title)
        }
        if (type === 'add-user') {
            GlobalEventBus.emit(PopUpEvents.hide);
            await this.addUser(data.userId)
        }
        if (type === 'delete-chat') {
            GlobalEventBus.emit(PopUpEvents.hide);
            await this.delete();
        }
    }

    async addUser(login) {
        const userId = await this.getUserId(login);
        const openedChat = Store.getState().openedChat;
        try {
            const response = await this.api.addUser({
                users: [
                    this.user.id, userId
                ],
                chatId: openedChat
            });
            if (response === 'OK') {
                GlobalEventBus.emit(PopUpEvents.show, userIsAdded);
            }
        } catch (error) {
            const {reason} = JSON.parse(error);
            GlobalEventBus.emit(PopUpEvents.show, userAddedError);
            GlobalEventBus.emit(PopUpEvents.showErrorMessage, {message: reason})
        }
    }

    async getUserId(login) {
        let result;
        try {
            result = await UserAPI.findUsers(login);
            result = JSON.parse(result);
            if (Array.isArray(result) && result[0]) {
                return result[0].id;
            } else {
                throw new Error('Не удалось добавить пользователя');
            }
        } catch (e) {
            console.error(e.message)
        }
    }

    async handleChangeEvent({inputType, value}) {
        if (inputType !== 'userId') return;

        let result;
        try {
            result = await UserAPI.findUsers(value);
            result = JSON.parse(result);
            if (Array.isArray(result)) {
                // TODO возможно вынести в отдельный модуль стора под модалку
                // и добавить выподашку со списком пользователей для добавления
                // Store.set('user/searchedUsers', result)
            }
        } catch (e) {
            console.error(e.message);
        }
    }

    handleStoreUpdate() {
        const state = Store.getState();

        this.user = state.user;
    }

    async init() {
        // Получить все чаты
        Store.set('isMessagesLoading', true);
        await this.prepareChats();
    }

    async prepareChats(chosenChatId = null) {
        const chats = await this.getAll();

        if (Array.isArray(chats)) {
            this.chatSockets = {};
            Store.set('chatPreviews', []);
            await Promise.all(chats.map(async chat => {
                Store.addChatPreview(chat);
                await this.openChatSocket(chat.id);
            }));

            let id;
            if (chosenChatId) {
                id = chosenChatId;
            } else if (chats.length) {
                id = chats[0].id;
            } else {
                id = chosenChatId;
            }
            Store.set('openedChat', id);
        }
        Store.set('isMessagesLoading', false);
    }

    add(chat: ChatPreviewDefault) {
        Store.set(`chatsMessages/${chat.id}`, []);
        Store.addChatPreview(chat);
    }

    async create(title) {
        try {
            const newChat = await this.api.create({title});
            const {id} = JSON.parse(newChat);
            if (id) {
                await this.prepareChats(id);
                GlobalEventBus.emit(PopUpEvents.show, chatIsCreated);
            }
        } catch (e) {
            console.error(e.message);
        }
    }

    async delete() {
        const {openedChat} = Store.getState();
        try {
            const isChatDeleted = await this.api.delete(openedChat);
            if (isChatDeleted) {
                Store.removeChatPreview(openedChat);
                Store.removeChat(openedChat);
                GlobalEventBus.emit(PopUpEvents.show, chatIsDeleted);
                await this.prepareChats();
            }
        } catch (e) {
            const error = JSON.parse(e);
            GlobalEventBus.emit(PopUpEvents.show, chatDeletedError);
            if (error.reason) {
                GlobalEventBus.emit(PopUpEvents.showErrorMessage, {message: error.reason});
            }
        }
    }

    async getAll() {
        let result;
        try {
            result = await this.api.read();
            result = JSON.parse(result);
        } catch (e) {
            console.error(e.message);
        }

        return result;
    }

    addMessage(text, chatId) {
        this.chatSockets[chatId].sendMessage(text);
    }

    handleNewMessage(data) {
        console.log('Incoming message', data);
        if (!data.chatId || !data.message || (data.message && ['pong', 'user connected'].includes(data.message.type))) return;

        // клгда пришла пачка сообщений
        if (Array.isArray(data.message)) {
            data.message.reverse().forEach(msg => Store.addMessageToChat(msg, data.chatId));
        }
        // Когда пришло 1 сообщение
        if ('content' in data.message) {
            Store.addMessageToChat(data.message, data.chatId);
        }

        Store.set('isMessagesLoading', false);
    }

    async openChatSocket(id) {
        const token = await this.getToken(id);
        if (!id || !this.user.id || (id in this.chatSockets) || !token) return;

        try {
            const socketUrl = `${Constants.WS_CHATS_URL}/${this.user.id}/${id}/${token}`;
            const chatSocket = new WS(socketUrl, id);
            this.chatSockets[id] = chatSocket;
            chatSocket.on(WSEvents.message, this.handleNewMessage.bind(this));
            chatSocket.on(WSEvents.closed, this.handleCloseChatSocket.bind(this, id));
            chatSocket.on(WSEvents.open, this.handleOpenChatSocket.bind(this, id));
            // соединение рвётся сервером по истечению 60 сек
            const sendingPingInterval = randomIntInRange(40, 59) * 1000;
            const intervalId = setInterval(async () => {
                if (chatSocket.getReadyState === WSReadyStates.open) {
                    chatSocket.sendPing();
                } else {
                    clearInterval(intervalId);
                    await this.openChatSocket(id);
                }

            }, sendingPingInterval);
        } catch (e) {
            console.error(e.message);
        }

    }

    async handleOpenChatSocket(id) {
        Store.set('isMessagesLoading', true);
        await this.chatSockets[id].getLastMessages();
    };

    handleCloseChatSocket(chatId) {
        delete this.chatSockets[chatId]
        const timerId = setTimeout(async () => {
            await this.openChatSocket(chatId);
            clearTimeout(timerId);
        }, reopenWebSocketTimeout)
    }

    async getToken(id) {
        const chatTokenResponse = await this.api.getChatToken(id);
        const {token} = JSON.parse(chatTokenResponse);

        return token;
    }

    async setChatUser(chatId) {
        let usersList = [];
        try {
            const response = await this.api.getChatUsersList(chatId);
            usersList = JSON.parse(response);
        } catch (e) {
            console.error(e)
        }
        // TODO пока непонятно как в интерфейсе отображать несколько пользователей, возвращаем первого
        return usersList[0];
    }
}

export default new ChatsController();
