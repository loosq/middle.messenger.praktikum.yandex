import Block from "../../utils/Block";
import template from "./modal.pug"
import "./modal.css";
import {Button} from "../button/Button";
import {InputGroup} from "../inputGroup/InputGroup";
import withRouter from "../../utils/withRouter"
import Router from "../../utils/Router";

interface ModalProps {
    buttonLabel: string,
    title: string,
    inputs: [],
    link: object,
    inputsValidationState: {
        [key: string]: boolean
    },
    classNames: string[],
    $router?: Router,
    onSubmit: (e: Event) => void
}

class Modal extends Block<ModalProps> {
    inputsValidationState: {
        [key: string]: boolean
    };
    events: {
        [key: string]: (e: Event) => void
    }

    constructor(props: ModalProps) {
        super(props);
        this.inputsValidationState = {};
        this.events = {
            submit: this.onSubmit
        }
    }

    setValidationStatus = (name, status) => {
        this.inputsValidationState[name] = status;
        const isValid = Object.values(this.inputsValidationState).every(v => v) as boolean;
        this.children.button.setProps({isActive: isValid});
    }

    handleLinkClick = (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        const {href} = e.target.dataset;
        const {$router} = this.props;

        if (href && $router) {
            $router.go(href)
        }
    }

    componentDidMount() {
        this.children.button = new Button({
            label: this.props.buttonLabel,
            classNames: ['modal__submit-button', 'radiused', 'text-center', 'full-width'],
            isActive: false
        });
        this.children.inputGroups = this.props.inputs?.map(({label, name, errorMessage, validateAs}) => {
            if (this.inputsValidationState) {
                this.inputsValidationState[name] = false;
            }

            return new InputGroup({
                label,
                name,
                errorMessage,
                validateAs,
                setValidationStatus: this.setValidationStatus
            })
        });
        this.setProps({events: this.events})
    }

    onSubmit = (e: Event) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        this.props.onSubmit(e);
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

export default withRouter(Modal);
