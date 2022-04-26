import BaseAPI from '../api';

export interface NewChat {
    title: string
}

export interface AddNewUserToChat {
    users: number[],
    chatId: number
  }

class ChatsAPI extends BaseAPI {
    constructor() {
        super('/chats');
    }

    create(data: NewChat): Promise<unknown> {
        return this.http.post('/', {data});
    }

    getChat(id): Promise<unknown> {
        return this.http.get(`/${id}/common`);
    }

    async read(): Promise<unknown> {
        return this.http.get('/');
    }

    addUser(data: AddNewUserToChat): Promise<unknown> {
        return this.http.put('/users', {data});
    }

    getChatToken(chatId): Promise<unknown> {
        return this.http.post(`/token/${chatId}`);
    }

    async delete(chatId): Promise<unknown> {
        return this.http.delete(
            '/', {data: {chatId}});
    }

    async update(): Promise<any> {}
}

export default new ChatsAPI();
