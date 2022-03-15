import Block from "../../utils/Block";
import Modal from "../../components/modal/Modal";
import template from "./login.pug";
import loginConfig from "./config/loginConfig";
import LoginController from "./LoginController";

export class Login extends Block<{}> {
    controller: LoginController;

    constructor() {
        super();
        this.controller = new LoginController();
    }

    componentDidMount() {
        const userData = this.controller?.getUserData();

        this.children.modal = new Modal({
            ...loginConfig,
            userData,
            onSubmit: (e: Event) => {
                if (e.target) {
                    // @ts-ignore
                    const formData = Object.fromEntries(new FormData(e.target));
                    delete formData.password_repeat

                    if (Object.values(formData).some(v => !v)){
                        throw new Error('Some values are missing!')
                    }

                    const data = JSON.stringify(formData);
                    this.controller.loginUser(data);
                }
            }
        });
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
