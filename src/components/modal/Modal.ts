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
    inputsValidationState: {},
    classNames: string[],
    $router: Router;
    events: object
}

class Modal extends Block<ModalProps> {
    events;

    constructor(props: ModalProps) {
        super(props);
        this.props = {
            ...props,
            inputsValidationState: {},
            events: {
                click: this.handleLinkClick
            }
        };
    }

    setValidationStatus = (name, status) => {
        this.props.inputsValidationState[name] = status;
        const isValid = Object.values(this.props.inputsValidationState).every(v => v) as boolean;
        this.children.button.setProps({isActive: isValid})
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

    render() {
        this.children.button = new Button({
            label: this.props.buttonLabel,
            classNames: ['modal__submit-button', 'radiused', 'text-center', 'full-width'],
            events: {
                click: () => {
                    const isValid = Object.values(this.props.inputsValidationState).every(v => v) as boolean;
                    if (isValid) {
                        console.log('Теперь всё отлично, форма заполнена корректно!')
                    } else {
                        console.error('Форма заполнена не корректно');
                    }
                }
            }
        });

        this.children.inputGroups = this.props.inputs.map(({label, name, errorMessage, validateAs}) => {

            if (this.props.inputsValidationState) {
                // @ts-ignore
                this.props.inputsValidationState[name] = false;
            }

            return new InputGroup({
                label,
                name,
                errorMessage,
                validateAs,
                setValidationStatus: this.setValidationStatus
            })
        });

        return this.compile(template, {...this.props});
    }
}

export default withRouter(Modal);
