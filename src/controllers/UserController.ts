import UserAPI, {UserDataCreate, UserDataLogin} from "../api/user/User";
import Store from "../utils/Store";
import Router from "../utils/Router";

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
        if (data.password !== data.password_repeat) {
            Store.set('error/modalForm', 'Passwords are not the same');
            return;
        }

        const {password_repeat, ...userDataCreate} = data;

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
            Store.set('error/modalForm', '');
            Router.go('/login');
        }
    }

    async logout() {
        await this.api.delete();
        Router.go('/login')
    }

    async checkUserData() {
        let response;
        try {
            response = await this.api.read();
        } catch (e) {
            console.error(e);
            return false;
        }
        console.log(JSON.parse(response))
        const {id, first_name, second_name, avatar, login, phone, email, display_name} = JSON.parse(response);
        Store.set('user/login', login);
        Store.set('user/id', id);
        Store.set('user/name', first_name);
        Store.set('user/displayName', display_name);
        Store.set('user/secondName', second_name);
        Store.set('user/email', email);
        Store.set('user/phone', phone);
        Store.set('user/avatar', avatar);

        return true;
    }

    async updateData(data) {
        return await this.api.update(data);
    }
}

export default new UserController();
