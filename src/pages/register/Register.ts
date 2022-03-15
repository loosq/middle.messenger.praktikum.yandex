import Block from "../../utils/Block";
import withRouter from "../../utils/withRouter";
import Modal from "../../components/modal/Modal";
import template from "./register.pug";
import RegisterController from "./RegisterController";
import registerConfig from "./config/registerConfig";

class Register extends Block<{}> {
    controller: RegisterController;

    constructor() {
        super();
        this.controller = new RegisterController();
    }

    initChildren() {
        this.children.modal = new Modal({
            ...registerConfig,
            onSubmit: (e: Event) => {
                if (e.target) {
                    // @ts-ignore
                    const formData = Object.fromEntries(new FormData(e.target));
                    delete formData.password_repeat

                    if (Object.values(formData).some(v => !v)){
                        throw new Error('Some values are missing!')
                    }
                    const data = JSON.stringify(formData);
                    this.controller.registerUser(data);
                }
            }
        });
    }

    render() {
        return this.compile(template);
    }
}

export default withRouter(Register)
