import Block from "../../utils/Block";
import withRouter from "../../utils/withRouter";
import Modal from "../../components/modal/Modal";
import template from "./register.pug";
import registerConfig from "./config/registerConfig";
import UserController from "../../controllers/UserController";
import {UserDataCreate} from "../../api/user/User";

class Register extends Block<{}> {
    initChildren() {
        this.children.modal = new Modal({
            ...registerConfig,
            onSubmit: async (e: Event) => {
                if (e.target) {
                    // @ts-ignore
                    const formData = Object.fromEntries(new FormData(e.target)) as UserDataCreate;

                    if (Object.values(formData).some(v => !v)){
                        throw new Error('Some values are missing!')
                    }

                    try {
                        await UserController.register(formData as UserDataCreate);
                    } catch (e) {
                        console.log(e)
                    }
                }
            }
        });
    }

    render() {
        return this.compile(template);
    }
}

export default withRouter(Register)
