import Block, { BlockProps } from "../../utils/Block";
import Modal from "../../components/modal/Modal";
import template from "./login.pug";
import loginConfig from "./config/loginConfig";
import UserController from "../../controllers/UserController";
import { UserDataLogin } from "../../api/user/types";
import Store from "../../utils/Store";
import withRouter from "../../utils/withRouter";
import PopUp from "../../components/popUp/PopUp";
import {PopUpEvents} from "../../controllers/ModalController";
import GlobalEventBus from "../../utils/GlobalEventBus";

interface LoginProps extends BlockProps {};

class Login extends Block<LoginProps> {
    constructor(props: LoginProps) {
        super(props);        
        this.emit(PopUpEvents.show, loginConfig);
        this.on(PopUpEvents.submit, this.handleSubmit.bind(this))
    }

    async handleSubmit(data) {
        let res;
        try {
            res = await UserController.login(data);
            console.log(res);
            
        } catch (error) {
            const response = JSON.parse(error);
            console.log(response);
            
            this.emit(PopUpEvents.showErrorMessage, {message: response.reason});
        }
    }

    // componentDidMount() {
    //     const userData = Store.getState().user;
    //     this.children.modal = new Modal({
    //         ...loginConfig,
    //         userData,
    //         onSubmit: async (e: Event) => {
    //             let res;

    //             if (e.target) {
    //                 // @ts-ignore
    //                 const formData = Object.fromEntries(new FormData(e.target)) as UserDataLogin;

    //                 if (Object.values(formData).some(v => !v)) {
    //                     Store.set('error/modalForm', 'Some values are missing!');
    //                     return;
    //                 }

    //                 try {
    //                     res = await UserController.login(formData);
    //                 } catch (error) {
    //                     const response = JSON.parse(error);
    //                     if (response.reason) {
    //                         Store.set('error/modalForm', response.reason);
    //                         return;
    //                     }
    //                 }

    //                 if (res === 'OK') {
    //                     Store.set('error/modalForm', '');
    //                     await UserController.checkUserData();
    //                     this.props.$router?.go('/messenger')
    //                 }
    //             }

    //         }
    //     });
    // }

    // initChildren() {
    //     this.children.popUp = new PopUp();
    //     console.log(this.children);

    // }

    // render() {
    //     console.log(this.props);

    //     return this.compile(template, {...this.props});
    // }
}

export default withRouter(Login);
