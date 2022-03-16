import Block from "../../utils/Block";
import withRouter from "../../utils/withRouter";
import Modal from "../../components/modal/Modal";
import template from "./register.pug";
import registerConfig from "./config/registerConfig";
import UserController from "../../controllers/UserController";

class Register extends Block<{}> {
    UserController: UserController;

    constructor() {
        super();
        this.UserController = new UserController();
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
                    console.log(formData)
                    this.UserController.register(formData);
                }
            }
        });
    }

    render() {
        return this.compile(template);
    }
}

export default withRouter(Register)
