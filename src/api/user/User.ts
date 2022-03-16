import BaseAPI from '../api';

export interface userDataCreate {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

export interface userDataLogin {
    login: string,
    password: string
}

export interface userPersonalData {
    id: string | number,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string | number,
    avatar: string
}

export default class UserAPI extends BaseAPI {
    create(data: userDataCreate): Promise<unknown> {

        return this.http
            .post('/auth/signup', {...data})
            .then((res) => res);
    }

    login(data: userDataLogin): Promise<unknown> {

        return this.http
            .post('/auth/signin', {...data})
            .then((res) => res);
    }

    read(): Promise<unknown> {

        return this.http
            .post('/auth/user')
            .then((res) => res);
    }

    delete(): Promise<unknown> {

        return this.http
            .post('/auth/logout')
            .then((res) => res);
    }
}
