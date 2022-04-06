import Block from "../../utils/Block";
import Modal from "../../components/modal/Modal";
import template from "./login.pug";
import loginConfig from "./config/loginConfig";
import UserController from "../../controllers/UserController";
import {UserDataLogin} from "../../api/user/User";
import Store from "../../utils/Store";
import withRouter from "../../utils/withRouter";

class Login extends Block<{}> {
    componentDidMount() {
        const userData = Store.getState().user;
        this.children.modal = new Modal({
            ...loginConfig,
            userData,
            onSubmit: async (e: Event) => {
                let res;

                if (e.target) {
                    // @ts-ignore
                    const formData = Object.fromEntries(new FormData(e.target)) as UserDataLogin;

                    if (Object.values(formData).some(v => !v)) {
                        Store.set('error/modalForm', 'Some values are missing!');
                        return;
                    }

                    try {
                        res = await UserController.login(formData);
                    } catch (error) {
                        const response = JSON.parse(error);
                        if (response.reason) {
                            Store.set('error/modalForm', response.reason);
                            return;
                        }
                    }

                    if (res === 'OK') {
                        Store.set('error/modalForm', '');
                        await UserController.checkUserData();
                        this.props.$router?.go('/chat')
                    }
                }

            }
        });
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

export default withRouter(Login);
