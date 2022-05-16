import Block, {BlockProps} from "../../utils/Block";
import loginConfig from "./config/loginConfig";
import UserController from "../../controllers/UserController";
import withRouter from "../../utils/withRouter";
import {PopUpEvents} from "../../controllers/ModalController";
import Store from "../../utils/Store";

const {URLS} = require('./../../constants.ts');

interface LoginProps extends BlockProps {
};

class Login extends Block<LoginProps> {
    constructor(props: LoginProps) {
        super(props);
        this.on(PopUpEvents.submit, this.handleSubmit.bind(this));
        this.on(PopUpEvents.click, this.handleClick.bind(this));
    }

    async handleSubmit(event) {
        if (event.type !== 'login') return;

        await UserController.login(event.data);
    }

    async componentDidMount(oldProps?: {}): Promise<void> {
        const isLoggedIn = await UserController.checkUserData();
        if (isLoggedIn) {
            this.props.$router?.go(URLS.messenger);
        } else {
            this.emit(PopUpEvents.show, loginConfig);
        }
    }

    handleClick({type, link}) {
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
