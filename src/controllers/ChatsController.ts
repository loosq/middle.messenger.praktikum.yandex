import ChatsAPI, {NewChat, AddNewUserToChat} from "../api/chats/Chats";
import Store, {StoreEvents} from "../utils/Store";
import {WS, WSEvents} from "../utils/WS";
const {WS_CHATS_URL} = require('./../constants');


class ChatsController {
    api;
    state;

    constructor() {
        this.api = ChatsAPI;
        this.state = Store.getState();

        Store.on(StoreEvents.Updated, () => {
            this.state = Store.getState();
        });
    }

    handleNewMessage(data) {
        console.log('Incoming message', data);
        if (!data.chatId || !data.message) return;

        const {chatId, message} = data;
        if (!Array.isArray(Store.getState().chatsMessages[chatId])) {
            Store.set(`chatsMessages/${chatId}`, []);
        }
        if (Array.isArray(message)) {
            Store.set(`chatsMessages/${chatId}`, [...message.reverse()]);
            Store.set('isMessagesLoading', false);
            return;
        }

        if (data.message.type === 'message' && data.chatId) {
            const messages = Store.getState().chatsMessages[data.chatId];
            Store.set(`chatsMessages/${data.chatId}`, [...messages, data.message]);
            console.log(Store.getState().chatsMessages[data.chatId])
        }
    }

    async setNewChat(data) {
        const newChatId = await this.api.create({title: data.title});
        if (!newChatId.reason) {
            try {
                const newChatResp = JSON.parse(newChatId);
                const chatId = newChatResp.id;
                await this.api.addUser({users: data.users, chatId});
                this.setUserChat(chatId);
            } catch (e) {
                console.error(e.message)
            }
        }
    }

    async deleteChat(chatId) {
        await this.api.delete(chatId);
    }

    async setUserChat(chatId) {
        const chatTokenResponse = await this.api.getChatToken(chatId);
        const {token} = JSON.parse(chatTokenResponse);

        if (chatId && token && this.state?.user?.id && !(chatId in this.state.chats)) {
            const socketUrl = `${WS_CHATS_URL}/${this.state.user.id}/${chatId}/${token}`;
            const chatSocket = new WS(socketUrl, chatId);
            chatSocket.on(WSEvents.message, this.handleNewMessage);
            Store.set(`chats/${chatId}`, chatSocket);
        }
    }

    async sendMessage(text, chatId) {
        this.state.chats[chatId].sendMessage(text);
    }

    async setUserMessages(chatId) {
        this.state.chats[chatId].getLastMessages();
    }

    async getUserChats() {
        const newChatResponse = await this.api.read();
        if (!newChatResponse.reason) {
            Store.set('user/chats', JSON.parse(newChatResponse));
        }
    }
}

export default new ChatsController();
