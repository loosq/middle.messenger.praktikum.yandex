import Block from "../../utils/Block";
import Modal from "../../components/modal/Modal";
import template from "./register.pug";
import store, {StoreEvents} from '../../utils/Store';
import RegisterController from "./RegisterController";
import registerConfig from "./config/registerConfig";

export class Register extends Block<{}> {
    controller: RegisterController;

    constructor() {
        super();
        this.controller = new RegisterController();
    }

    initChildren() {
        this.children.modal = new Modal({
            ...registerConfig,
            onSubmit: (e) => console.log(e)
        });
    }

    render() {
        return this.compile(template);
    }
}
