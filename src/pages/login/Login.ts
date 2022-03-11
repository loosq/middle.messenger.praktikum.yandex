import Block from "../../utils/Block";
import Modal from "../../components/modal/Modal";
import template from "./login.pug";
import loginConfig from "./config/loginConfig";

export class Login extends Block<{}> {

    initChildren() {
        this.children.modal = new Modal({
            ...loginConfig,
            onSubmit: (e) => console.log(e)
        });
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
