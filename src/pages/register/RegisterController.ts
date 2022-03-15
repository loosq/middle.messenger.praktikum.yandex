import UserApi from "../../api/user/user"
import store from '../../utils/Store';
import Router from "../../utils/Router";

export default class RegisterController {
    private _router;
    private _userApi;

    constructor() {
        this._router = new Router();
        this._userApi = new UserApi();
    }

    public registerUser(data) {

        this._userApi.create({data})
            .then(({response}) => {
                const res = JSON.parse(response);
                const responseAsArray = Object.entries(res);
                const isSuccess = Array.isArray(responseAsArray) && responseAsArray[0].includes("id");
                if (isSuccess) {
                    const id = responseAsArray[0][1];
                    let userData = JSON.parse(data);

                    store.set('currentUser', {id});
                    store.set('modalError', '');

                    store.set('userLogin', userData.login);
                    store.set('userPassword', userData.password);
                    store.set('userName', userData.first_name);
                    store.set('userSecondName', userData.second_name);
                    store.set('userEmail', userData.email);
                    store.set('userPhone', userData.phone);
                    this._router.go('/login')
                }

                if (res.reason) {
                    store.set('modalError', res.reason)
                }
            })
    }
}
