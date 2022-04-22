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

export interface UserDataUpdate {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string
}

export interface UserPasswordUpdate {
    [key: string]: FormDataEntryValue
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

    update(data: UserDataUpdate): Promise<unknown> {
        return this.http.put('/user/profile', {data});
    }

    updatePass(data: UserPasswordUpdate): Promise<unknown> {
        return this.http.put('/user/password', data);
    }

    updateAvatar(avatar) {
        return this.http.put('/user/profile/avatar', {avatar});
    }
}

export default new UserAPI();
