import Block from "../../utils/Block";
import {Modal} from "../../components/modal/Modal";
import template from "./signIn.pug";
import registerConfig from "./config/registerConfig";

export class Register extends Block {
    initChildren() {
        this.children.modal = new Modal({...registerConfig});
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
