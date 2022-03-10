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
    $router: Router;
    events: {
        [key: string]: (e: Event) => void
    }
}

class Modal extends Block<ModalProps> {
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

    componentDidMount(oldProps:ModalProps) {
        this.props = {
            ...this.props,
            inputsValidationState: {},
            events: {
                click: this.handleLinkClick
            }
        };
    }

    get compiledValues() {
        return {
            ...this.props,
            inputsValidationState: {},
            events: {
                click: this.handleLinkClick
            }
        }
    }

    initChildren() {
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
        this.children.inputGroups = this.props.inputs?.map(({label, name, errorMessage, validateAs}) => {
            this.props.inputsValidationState[name] = false;

            return new InputGroup({
                label,
                name,
                errorMessage,
                validateAs,
                setValidationStatus: this.setValidationStatus
            })
        }) || [];
    }

    render() {
        return this.compile(template, {...this.compiledValues});
    }
}

export default withRouter(Modal);
