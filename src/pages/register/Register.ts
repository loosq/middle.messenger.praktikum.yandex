import Block, { BlockProps } from "../../utils/Block";
import withRouter from "../../utils/withRouter";
import registerConfig from "./config/registerConfig";
import UserController from "../../controllers/UserController";
import {PopUpEvents} from "../../controllers/ModalController";
const {URLS} = require('../../constants');

interface RegisterProps extends BlockProps { };

class Register extends Block<RegisterProps> {
    constructor(props: RegisterProps) {
        super(props);        
        this.on(PopUpEvents.submit, this.handleSubmit.bind(this));
        this.on(PopUpEvents.click, this.handleClick.bind(this));
    }

    async handleSubmit({data, type}) {
        if (type !== 'sign-up') return;

        let response;
        try {
            response = await UserController.register(data);
            if (response === 'OK') {
                this.emit(PopUpEvents.hide);
                this.props.$router?.go(URLS.messenger);
            }
        } catch (error) {
            response = typeof error === 'string' ? JSON.parse(error) : error;
            const message = response.reason ? response.reason : response.message;
            this.emit(PopUpEvents.showErrorMessage, { message });
        }
    }

    handleClick({ type, link }) {  
        if (type !== 'sign-up') return;

        this.emit(PopUpEvents.hide);
        this.props.$router?.go(link);
    }

    componentDidMount() {
        this.emit(PopUpEvents.show, registerConfig);
     }

    componentDidUnmount() {        
        this.off(PopUpEvents.submit, this.handleSubmit.bind(this));
        this.off(PopUpEvents.click, this.handleClick.bind(this));
    }
}

export default withRouter(Register)
