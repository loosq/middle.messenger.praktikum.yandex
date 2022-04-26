import Block, {BlockProps} from "../../../../utils/Block";
import template from "./changePassModal.pug";
import Modal from "../../../../components/modal/Modal";
import Store from "../../../../utils/Store";
import UserController from "../../../../controllers/UserController";
import changePassModalConfig from "./config/changePassModalConfig";
import "./changePassModal.css";

interface ChangePassModalProps extends BlockProps{
    children: Record<string, any>,
    isPassModalVisible: boolean
}

export default class ChangePassModal extends Block<ChangePassModalProps>{
    constructor() {
        super();
        this.props.isPassModalVisible = false;
    }

    initChildren() {
        this.children.modalPass = new Modal({
            ...changePassModalConfig,
            onSubmit: async (e: Event & {target: HTMLFormElement}) => {
                let res;

                if (e.target) {
                    const formData = Object.fromEntries(new FormData(e.target));

                    if (Object.values(formData).some(v => !v)) {
                        Store.set('error/modalForm', 'Some values are missing!');
                        return;
                    }

                    try {
                        res = await UserController.changePassword(formData);
                    } catch (error) {
                        const response = JSON.parse(error);
                        if (response.reason) {
                            Store.set('error/modalForm', response.reason);
                            return;
                        }
                    }

                    if (res === 'OK') {
                        Store.set('error/modalForm', '');
                        this.setProps({isPassModalVisible: false});
                    }
                }

            }
        });
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
