import BaseAPI from '../api';
import { UserDataSingIn, UserDataLogin, UserDataUpdate, UserPasswordUpdate, FindUsers } from './types';

class UserAPI extends BaseAPI {

    create(data: UserDataSingIn): Promise<unknown> {
        return this.http.post('/auth/signup', { data , headers: {"Content-Type": "application/json"}});
    }

    login(data: UserDataLogin): Promise<unknown> {
        return this.http.post('/auth/signin', { data , headers: {"Content-Type": "application/json"}})
    }

    read(): Promise<unknown> {
        return this.http.get('/auth/user');
    }

    delete(): Promise<unknown> {
        return this.http.post('/auth/logout');
    }

    update(data: UserDataUpdate): Promise<unknown> {
        return this.http.put('/user/profile', { data , headers: {"Content-Type": "application/json"}});
    }

    updatePass(data: UserPasswordUpdate): Promise<unknown> {
        return this.http.put('/user/password', { data , headers: {"Content-Type": "application/json"}});
    }

    updateAvatar(data) {
        return this.http.put('/user/profile/avatar', {data});
    }

    findUsers(login: FindUsers) {
        return this.http.post('/user/search', { data: { login }, headers: {"Content-Type": "application/json"} });
    }

    findUserById(id: number) {
        return this.http.get(`/user/${id}`);
    }
}

export default new UserAPI();
