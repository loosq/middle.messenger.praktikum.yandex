import {UserDataCreate, UserDataLogin, UserPasswordUpdate} from "../api/user/types";
import UserAPI from "../api/user/User";
import Store from "../utils/store/Store";
import Router from "../utils/router/Router";
import GlobalEventBus from "../utils/GlobalEventBus";
import {PopUpEvents} from "./ModalController";
import {avatarSuccessChange} from "../pages/profile/mocks/avatarSuccessChange";
import {avatarChangeError} from "../pages/profile/mocks/avatarChangeError";

const {URLS} = require('./../constants');

class UserController {
    api;

    constructor() {
        this.api = UserAPI;
    }

    async login(data: UserDataLogin) {
        let response;
        try {
            response = await this.api.login(data);
            if (response === 'OK') {
                await this.checkUserData();
                GlobalEventBus.emit(PopUpEvents.hide);
                Router.go(URLS.messenger);
                Store.set('isMessagesLoading', true);
            }
        } catch (e) {
            const error = JSON.parse(e);
            if (error.reason) {
                GlobalEventBus.emit(PopUpEvents.showErrorMessage, {message: error.reason});
            }
        }
    }

    async register(data: UserDataCreate) {
        const {password_repeat, ...userDataCreate} = data;

        if (password_repeat !== userDataCreate.password) {
            GlobalEventBus.emit(PopUpEvents.showErrorMessage, {message: 'Пароли не совпадают'});
            return;
        }

        try {
            await this.api.create(userDataCreate);
            await this.checkUserData();
            GlobalEventBus.emit(PopUpEvents.hide);
            Router.go(URLS.messenger);
            Store.set('isMessagesLoading', true);
        } catch (e) {
            const error = JSON.parse(e);
            if (error.reason) {
                GlobalEventBus.emit(PopUpEvents.showErrorMessage, {message: error.reason});
            }
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
                Store.setUser(userData);
                return true;
            }

        } catch (e) {
            const error = typeof e === 'string' ? JSON.parse(e) : e;
            console.error(error.reason ? error.reason : e.message);
            return false;
        }
    }

    async updateData(data) {
        return await this.api.update(data);
    }

    async changePassword(data: UserPasswordUpdate) {
        return await this.api.updatePass(data);
    }

    async changeAvatar(data) {
        try {
            let response = await this.api.updateAvatar(data);
            // TODO подумать как избавится от такой костылины
            response = typeof response === 'string' && response ? JSON.parse(response) : response;
            if (response && response.id) {
                GlobalEventBus.emit(PopUpEvents.show, avatarSuccessChange);
                return true;
            } else {
                throw new Error('Что то пошло не так')
            }
        } catch (e) {
            GlobalEventBus.emit(PopUpEvents.show, avatarChangeError);
            GlobalEventBus.emit(PopUpEvents.showErrorMessage, {message: e.message})
        }
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
            return result;
        } else {
            result = JSON.parse(response);
        }

        return result;
    }
}

export default new UserController();
