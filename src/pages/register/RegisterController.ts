import userApi from "../../api/user/user"
import store from '../../utils/Store';

export default class RegisterController {
    public registerUser(data) {

        userApi.create(data)
            .then(data => store.set('user', data))
    }
}
