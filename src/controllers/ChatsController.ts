import ChatsAPI, {NewChat, AddNewUserToChat} from "../api/chats/Chats";
import Store from "../utils/Store";
import Router from "../utils/Router";

const {WS_CHATS_URL} = require('./../constants');

interface NewChatData extends NewChat, AddNewUserToChat {};

class ChatsController {
    api;

    constructor() {
        this.api = ChatsAPI;
    }
    async setNewChat(data) {
        const newChatId = await this.api.create({title: data.title});
        if (!newChatId.reason) {
            try {
                const newChatResp = JSON.parse(newChatId);
                const chatId = newChatResp.id;
                console.log('data.users', data.users, 'chatId', chatId);
                
                await this.api.addUser({users: data.users, chatId});
                const chatTokenResponse = await this.api.getChatToken(chatId);
                const {token} = JSON.parse(chatTokenResponse);
                const socket = new WebSocket(`${WS_CHATS_URL}/${data.users[0]}/${chatId}/${token}`); 
                socket.addEventListener('open', () => {
                    console.log('Соединение установлено');
                  
                    socket.send(JSON.stringify({
                      content: 'Моё первое сообщение миру!',
                      type: 'message',
                    }));
                  });
                  
                  socket.addEventListener('close', event => {
                    if (event.wasClean) {
                      console.log('Соединение закрыто чисто');
                    } else {
                      console.log('Обрыв соединения');
                    }
                  
                    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
                  });
                  
                  socket.addEventListener('message', event => {
                    console.log('Получены данные', event.data);
                  });
                  
                  socket.addEventListener('error', (event: Event & {message: string}) => {
                    console.log('Ошибка', event.message);
                  }); 

            } catch(e) {
                console.error(e.message)
            }
        }
    }

    async getUserChats() {
        const newChatResponse = await this.api.read();
        if (!newChatResponse.reason) {
            Store.set('user/chats', JSON.parse(newChatResponse));
        }
    }
}

export default new ChatsController();
