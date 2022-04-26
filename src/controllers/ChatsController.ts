import ChatsAPI, { NewChat, AddNewUserToChat } from "../api/chats/Chats";
import { ChatPreviewDefault } from "../pages/chat/fragments/chatPreview/ChatPreview";
import { randomIntInRange } from "../utils/lodash";
import Store, { StoreEvents } from "../utils/Store";
import { WS, WSEvents } from "../utils/WS";
const { WS_CHATS_URL } = require('./../constants');
const reopenWebSocketTimeout = 10000;

class ChatsController {
    api;
    state;
    chatSockets;
    user;

    constructor() {
        this.api = ChatsAPI;
        this.chatSockets = {};
        this.user = Store.getState().user;
        Store.on(StoreEvents.Updated, this.handleStoreUpdate.bind(this));
    }

    handleStoreUpdate() {
        const state = Store.getState()
        if (state.user) {
            this.user = state.user;
        }
    }

    async init() {
        // Получить все чаты
        Store.set('isMessagesLoading', true);
        const chats = await this.getAll();

        if (Array.isArray(chats) && chats.length) {
            // Сохранить в стор обьекты чата для сообщений и превьюшки и открыть сокет на чат
            console.log(chats);
            
            Promise.all(chats.map(async chat => {
                this.add(chat);
                const token = await this.getToken(chat.id);
                await this.openChatSocket(chat.id, token);
            }));
            Store.set('openedChat', chats[0].id);
        }
    }

    add(chat: ChatPreviewDefault) {
        Store.set(`chatsMessages/${chat.id}`, []);
        Store.addChatPreview(chat);
    }

    async create(users, title = 'new chat') {
        const newChatId = await this.api.create({ title });
        if (!newChatId.reason) {
            try {
                const chatId = JSON.parse(newChatId).id;
                await this.api.addUser({ users: [String(this.user.id), ...users], chatId });
                const newChat = {
                    id: chatId,
                    title: "new-chat",
                    avatar: "",
                    unread_count: 0,
                    last_message: {
                        user: this.user,
                        time: new Date().toISOString(),
                        content: ""
                    }
                }
                this.add(newChat);
                Store.set('openedChat', chatId);
                const chatTokenResponse = await this.api.getChatToken(chatId);
                const { token } = JSON.parse(chatTokenResponse);
                this.openChatSocket(chatId, token);
            } catch (e) {
                console.error(e.message);
            }
        }
    }

    async delete(id) {
        // удалить чат
        await this.api.delete(id)
        // удалить чат из стора
        Store.deleteChatPreview(id);
        delete this.chatSockets[id];
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
        // доюавить сообщение в чат
        Store.addMessageToChat(text, chatId);
    }


    handleNewMessage(data) {
        console.log('Incoming message', data);
        if (!data.chatId || !data.message || (data.message && data.message.type === 'pong')) return;

        if (Array.isArray(data.message)) {
            data.message.reverse().forEach(msg => {
                this.addMessage(msg, data.chatId);
            });
        }

        if ('content' in data.message) {
            this.addMessage(data.message, data.chatId);
        }

        Store.set('isMessagesLoading', false);
    }

    async openChatSocket(id, token) {
        if (!id || !this.user.id || (id in this.chatSockets)) return;

        try {
            console.log('openChatSocket called');
            const socketUrl = `${WS_CHATS_URL}/${this.user.id}/${id}/${token}`;
            const chatSocket = new WS(socketUrl, id);
            this.chatSockets[id] = chatSocket;
            chatSocket.on(WSEvents.message, this.handleNewMessage.bind(this));
            chatSocket.on(WSEvents.closed, this.handleCloseChatSocket.bind(this, id));
            chatSocket.on(WSEvents.open, this.handleOpenChatSocket.bind(this, id));
            // соединение рвётся сервером по истечению 60 сек
            setInterval(() => {
                chatSocket.sendPing();
            }, randomIntInRange(40, 59) * 1000);
        }
        catch (e) {
            console.error(e.message);
        }

    }

    async handleOpenChatSocket(id) {
        await this.chatSockets[id].getLastMessages()
    };

    handleCloseChatSocket(chatId) {
        delete this.chatSockets[chatId]
        const timerId = setTimeout(() => {
            const token = this.getToken(chatId);
            this.openChatSocket(chatId, token);
        }, reopenWebSocketTimeout)
    }

    sendMessage(text, chatId) {
        console.log(text, chatId);

        this.chatSockets[chatId].sendMessage(text);
    }

    async getToken(id) {
        const chatTokenResponse = await this.api.getChatToken(id);
        const { token } = JSON.parse(chatTokenResponse);

        return token;
    }
}

export default new ChatsController();
