import Block, {BlockProps} from "../../utils/Block";
import withRouter from "../../utils/withRouter";
import registerConfig from "./config/registerConfig";
import UserController from "../../controllers/UserController";
import {PopUpEvents} from "../../controllers/ModalController";

interface RegisterProps extends BlockProps {
};

class Register extends Block<RegisterProps> {
    constructor(props: RegisterProps) {
        super(props);
        this.on(PopUpEvents.submit, this.handleSubmit.bind(this));
        this.on(PopUpEvents.click, this.handleClick.bind(this));
    }

    async handleSubmit({data, type}) {
        if (type !== 'sign-up') return;

        await UserController.register(data);
    }

    handleClick({type, link}) {
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
