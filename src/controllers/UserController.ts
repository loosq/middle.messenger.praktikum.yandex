import UserAPI, {userDataCreate, userDataLogin, userPersonalData} from "../api/user/User";
import Store from "../utils/Store";
import Router from "../utils/Router";
import store from "../utils/Store";


export default class UserController {
    api;

    constructor() {
        this.api = new UserAPI();
    }

    async login(data: userDataLogin) {
        await this.api.login(data);
    }

    async register(data: userDataCreate) {
        const response = await this.api.create(data);

        if (response.reason) {
            store.set(`error/modalForm`, response.reason);
            return;
        }

        await this.setPersonalInfo();
        Router.go('/login');
    }

    async logout() {
        await this.api.delete();
    }

    async setPersonalInfo() {
        const data: userPersonalData = await this.api.read();
        Object.entries(data).forEach(([key, value]) => Store.set(`user/${key}`, value));
    }
}
