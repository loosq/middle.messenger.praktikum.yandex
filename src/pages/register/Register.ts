import Block from "../../utils/Block";
import Modal from "../../components/modal/Modal";
import template from "./register.pug";
import registerConfig from "./config/registerConfig";

export class Register extends Block<{}> {
    constructor(props) {
        super(props);
    }

    initChildren() {
        this.children.modal = new Modal({...registerConfig});
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
