import store from '../../utils/Store';
import Router from "../../utils/Router";
import UserApi from "../../api/user/user";

export default class LoginController {
    private _router;
    private _userApi;
    private _store;

    constructor() {
        this._router = new Router();
        this._userApi = new UserApi();
        this._store = store.getState();
    }

    public loginUser(data) {

        this._userApi.login({data})
            .then(({response}) => {
                if (response === "OK") {
                    store.set('modalError', '');
                    this._router.go('/chat');
                    return;
                }

                const res = JSON.parse(response);
                if (res.reason) {
                    store.set('modalError', res.reason)
                }
            })
    }

    public getUserData() {
        return {
            login: this._store.userLogin,
            password: this._store.userPassword
        };
    }
}
