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
        super('chats');
    }

    create(data: NewChat): Promise<unknown> {
        return this.http.post('/', {data});
    }

    addUser(data: AddNewUserToChat): Promise<unknown> {
        return this.http.put('/users', {data});
    }

    async delete(): Promise<any> {}

    async read(): Promise<any> {}

    async update(): Promise<any> {}
}

export default new ChatsAPI();
