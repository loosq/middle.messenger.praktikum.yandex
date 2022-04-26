import Block from "../../utils/Block";
import template from "./modal.pug"
import "./modal.css";
import {Button} from "../button/Button";
import {InputGroup} from "../inputGroup/InputGroup";
import withRouter from "../../utils/withRouter"
import Router from "../../utils/Router";
import {ServerError} from "../serverError/ServerError";
import store, {StoreEvents} from "../../utils/Store";

interface ModalProps {
    buttonLabel: string,
    title: string,
    inputs: [],
    link: object,
    classNames?: string[],
    $router?: typeof Router,
    onSubmit: (e: Event) => void,
    serverErrorText?: string,
    userData: {
        [key: string]: string
    }
}

class Modal extends Block<ModalProps> {
    private _isFormValid: Boolean;
    private _inputsValidationState: {
        [key: string]: boolean
    };
    private _events: {
        [key: string]: (e: Event) => void
    }

    constructor(props: ModalProps) {
        super(props);
        this._inputsValidationState = {};
        this._events = {
            submit: this.onSubmit,
            click: this.handleLinkClick
        };
        this._isFormValid = false;

        store.on(StoreEvents.Updated, this.onChangeState);
    }

    onChangeState = () => {
        const state = store.getState();
        const {modalForm} = state.error;
        if (modalForm) {
            this.children.serverError.setProps({label: modalForm})
        }
    }

    setValidationStatus = (name, status) => {
        this._inputsValidationState[name] = status;
        const isValid = Object.values(this._inputsValidationState).every(v => v) as boolean;

        if (this._isFormValid !== isValid) {
            this._isFormValid = isValid;
            this.children.button.setProps({isActive: isValid});
        }
    }

    handleLinkClick = (e) => {
        const {href} = e.target.dataset;
        const {$router} = this.props;
        
        if (href && $router) {
            e.preventDefault();
            e.stopImmediatePropagation();

            $router.go(href);
        }
    }

    componentDidMount() {
        this.children.button = new Button({
            label: this.props.buttonLabel,
            classNames: ['modal__submit-button', 'radiused', 'text-center', 'full-width'],
            isActive: false
        });
        this.children.inputGroups = this.props.inputs?.map(({label, name, errorMessage, validateAs}) => {
            if (this._inputsValidationState) {
                this._inputsValidationState[name] = false;
            }
            let value = '';
            if (this.props.userData && name in this.props.userData && this.props.userData[name] && this._inputsValidationState) {
                value = this.props.userData[name];
                this._inputsValidationState[name] = true;
                this.children.button.setProps({isActive: true});
            }

            return new InputGroup({
                label,
                name,
                errorMessage,
                validateAs,
                value,
                setValidationStatus: this.setValidationStatus
            })
        });
        this.children.serverError = new ServerError({label: ''});
        this.setProps({events: this._events});
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
