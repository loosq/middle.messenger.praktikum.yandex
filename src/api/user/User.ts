import BaseAPI from '../api';
import {UserDataSingIn, UserDataLogin, UserDataUpdate, UserPasswordUpdate, FindUsers, UserPersonalData} from './types';

class UserAPI extends BaseAPI {

    create(data: UserDataSingIn): Promise<UserDataSingIn> {
        return this.http.post('/auth/signup', { data , headers: {"Content-Type": "application/json"}});
    }

    login(data: UserDataLogin): Promise<string> {
        return this.http.post('/auth/signin', { data , headers: {"Content-Type": "application/json"}})
    }

    read(): Promise<UserPersonalData> {
        return this.http.get('/auth/user');
    }

    delete(): Promise<string> {
        return this.http.post('/auth/logout');
    }

    update(data: UserDataUpdate): Promise<UserDataUpdate> {
        return this.http.put('/user/profile', { data , headers: {"Content-Type": "application/json"}});
    }

    updatePass(data: UserPasswordUpdate): Promise<string> {
        return this.http.put('/user/password', { data , headers: {"Content-Type": "application/json"}});
    }

    updateAvatar(data): Promise<UserPersonalData> {
        return this.http.put('/user/profile/avatar', {data});
    }

    findUsers(login: FindUsers): Promise<UserPersonalData[]> {
        return this.http.post('/user/search', { data: { login }, headers: {"Content-Type": "application/json"} });
    }

    findUserById(id: number): Promise<UserPersonalData> {
        return this.http.get(`/user/${id}`);
    }
}

export default new UserAPI();
