import Block from "../../utils/Block";
import Modal from "../../components/modal/Modal";
import template from "./login.pug";
import loginConfig from "./config/loginConfig";

export class Login extends Block<{}> {
    constructor(props) {
        super(props);
    }

   initChildren() {
        this.children.modal = new Modal({...loginConfig});
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
