import Block from "../../utils/Block";
import template from "./modal.pug"
import "./modal.css";
import {Button} from "../button/Button";
import {InputGroup} from "../inputGroup/InputGroup";

interface ModalProps {
    buttonLabel: string,
    title: string,
    inputs: [],
    link: string,
    inputsValidationState: {},
    classNames: string[]
}

export class Modal extends Block<ModalProps> {

    constructor(props: ModalProps) {
        super(props);
        this.props.inputsValidationState = {}
    }

    setValidationStatus = (name, status) => {
        this.props.inputsValidationState[name] = status;
        const isValid = Object.values(this.props.inputsValidationState).every(v => v) as boolean;
        this.children.button.setProps({isActive: isValid})
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
