import UserAPI, {userDataCreate, userDataLogin} from "../api/user/User";
import Store from "../utils/Store";


export default class UserController {
    api;
    constructor() {
        this.api = new UserAPI();
    }

    login(data: userDataLogin) {
        return this.api.login(data);
    }

    register(data: userDataCreate) {
        return this.api.create(data);
    }
}
