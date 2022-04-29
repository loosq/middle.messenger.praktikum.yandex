import Block, { BlockProps } from "../../utils/Block";
import loginConfig from "./config/loginConfig";
import UserController from "../../controllers/UserController";
import withRouter from "../../utils/withRouter";
import { PopUpEvents } from "../../controllers/ModalController";
const { URLS } = require('./../../constants.ts');

interface LoginProps extends BlockProps { };

class Login extends Block<LoginProps> {
    constructor(props: LoginProps) {
        super(props);
        this.on(PopUpEvents.submit, this.handleSubmit.bind(this));
        this.on(PopUpEvents.click, this.handleClick.bind(this));
    }

    async handleSubmit({ data }) {
        let response;
        try {
            response = await UserController.login(data);
            if (response === 'OK') {
                this.emit(PopUpEvents.hide);
                this.props.$router?.go(URLS.messenger);
            }
        } catch (error) {            
            const message = response.reason ? response.reason : 'Что то пошло не так';
            this.emit(PopUpEvents.showErrorMessage, { message });
        }
    }

    componentDidMount(oldProps?: {}): void {
        this.emit(PopUpEvents.show, loginConfig);
    }

    handleClick({ type, link }) {
        if (type !== 'login') return;

        this.emit(PopUpEvents.hide);
        this.props.$router?.go(link);
    }

    componentDidUnmount() {
        this.off(PopUpEvents.submit, this.handleSubmit.bind(this));
        this.off(PopUpEvents.click, this.handleClick.bind(this));
    }
}

export default withRouter(Login);
