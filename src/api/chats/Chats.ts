import BaseAPI from '../api';
import {NewChat, CreatedChatResponse, AddNewUserToChat, TokenResponse, DeletedChatResponse, ChatUsersResponse} from "./types";

class ChatsAPI extends BaseAPI {
    constructor() {
        super('/chats');
    }

    create(data: NewChat): Promise<NewChat> {
        return this.http.post('/', {data, headers: {"Content-Type": "application/json"}});
    }

    async read(): Promise<CreatedChatResponse> {
        return this.http.get('/');
    }

    addUser(data: AddNewUserToChat): Promise<string> {
        return this.http.put('/users', {data, headers: {"Content-Type": "application/json"}});
    }

    getChatToken(chatId): Promise<TokenResponse> {
        return this.http.post(`/token/${chatId}`);
    }

    async delete(chatId): Promise<DeletedChatResponse> {
        return this.http.delete(
            '/', {data: {chatId}, headers: {"Content-Type": "application/json"}});
    }

    async getChatUsersList(chatId): Promise<ChatUsersResponse> {
        return this.http.get(`/${chatId}/users`);
    }

    async update(): Promise<any> {}
}

export default new ChatsAPI();
