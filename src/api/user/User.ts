import BaseAPI from '../api';

export interface UserDataCreate {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string,
    password_repeat: string
}

export interface UserDataSingIn {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

export interface UserDataLogin {
    login: string,
    password: string
}

export interface UserPersonalData {
    id: string | number,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string | number,
    avatar: string
}

class UserAPI extends BaseAPI {
    constructor() {
        super('');
    }

    create(data: UserDataSingIn): Promise<unknown> {
        return this.http.post('/auth/signup', data);
    }

    login(data: UserDataLogin): Promise<unknown> {
        return this.http.post('/auth/signin', data)
    }

    read(): Promise<unknown> {
        return this.http.get('/auth/user');
    }

    delete(): Promise<unknown> {
        return this.http.post('/auth/logout');
    }

    update(identifier: string, data: unknown): Promise<unknown> {
        return Promise.resolve(undefined);
    }
}

export default new UserAPI();
