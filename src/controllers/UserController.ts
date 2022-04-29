import { UserDataCreate, UserDataLogin, UserPasswordUpdate } from "../api/user/types";
import UserAPI from "../api/user/User";
import Store from "../utils/Store";
import Router from "../utils/Router";
const {URLS} = require('./../constants');

class UserController {
    api;

    constructor() {
        this.api = UserAPI;
    }
    async login(data: UserDataLogin) {
        return await this.api.login(data);
    }

    async register(data: UserDataCreate) {
        let res;

        const { password_repeat, ...userDataCreate } = data;

        try {
            res = await this.api.create(userDataCreate);
        } catch (error) {
            const response = JSON.parse(error);
            Store.set('error/modalForm', response.reason || 'Something went wrong');
            return;
        }

        const response = JSON.parse(res);
        if (response.id) {
            Store.set('user/id', response.id);
            Store.set('user/name', data.first_name);
            Store.set('user/secondName', data.second_name);
            Store.set('user/displayName', `${data.first_name} ${data.second_name}`);
            Store.set('user/email', data.email);
            Store.set('user/phone', data.phone);
            Store.set('user/login', data.login);
            Store.set('user/password', data.password);
            Router.go(URLS.messenger);
        }
    }

    async logout() {
        await this.api.delete();
        Router.go(URLS.login);
    }

    async checkUserData() {
        try {
            const response = await this.api.read();

            if (!response.reason) {
                const userData = JSON.parse(response);
                Store.setUser(userData)
            };
        } catch (e) {
            console.error(e.reason ? e.reason : e.message);
        }
    }

    async updateData(data) {
        return await this.api.update(data);
    }

    async changePassword(data: UserPasswordUpdate) {
        return await this.api.updatePass(data);
    }

    async changeAvatar(avatar) {
        return await this.api.updateAvatar(avatar);
    }

    async findUsers(login) {
        if (typeof login !== 'string' || login === '') {
            Store.set('user/searchedUsers', []);
            return;
        }
        const response = await this.api.findUsers(login);
        if (!response.reason) {
            Store.set('user/searchedUsers', JSON.parse(response));
        } else {
            Store.set('user/searchedUsers', []);
        }
    }

    async findUserById(id) {
        const response = await this.api.findUserById(id);
        let result = {};

        if (response.reson) {
            console.error(response.reson);
            return result;
        } else {
            result = JSON.parse(response);
        }

        return result;
    }
}

export default new UserController();
