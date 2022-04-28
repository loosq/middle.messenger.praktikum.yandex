import Block, { BlockProps } from "../../utils/Block";
import GlobalEventBus from "../../utils/GlobalEventBus";
import template from "./template.pug";
import "./styles.css";
import { InputGroup, InputGroupProps } from "../inputGroup/InputGroup";
import { Error } from "../inputGroup/fragments/error/Error";
import { Button, ButtonProps } from "../button/Button";
import { PopUpEvents } from "../../controllers/ModalController";

export interface PopUpProps extends BlockProps {
    type: string,
    title?: string,
    inputs?: InputGroupProps[],
    buttons?: ButtonProps[],
}

export default class PopUp extends Block<PopUpProps> {
    inputsStatuses;
    constructor(props: PopUpProps) {
        super(props);
        this.props = {
            ...props,
            events: {
                submit: (e: Event) => this.handleSubmit(e)
            }
        }
    }

    initChildren(): void {
        const { inputs, buttons } = this.props;
        this.children = {
            inputsGroup: [],
            buttons: []
        }
        this.inputsStatuses = {}
        inputs?.forEach(input => {
            this.inputsStatuses[input.name] = false;
            this.children.inputsGroup.push(new InputGroup({
                ...input,
                onInputChange: this.onInputChange.bind(this)
            }))
        });
        buttons?.forEach(button => this.children.buttons.push(new Button(button)));
        this.children.serverError = new Error({ isModalError: true });
    }

    onInputChange(status, inputName: string) {
        this.inputsStatuses[inputName] = status;
        const isAllInputsValid = Object.values(this.inputsStatuses).every(inputStatus => inputStatus === true);
        const buttonSubmit = this.children.buttons.find((button) => button.props.type === 'submit');
        this.children.serverError.setProps({ errorMessage: "" })
        buttonSubmit.setProps({ isActive: isAllInputsValid })
    }

    handleSubmit(e: Event & { target: HTMLFormElement }) {
        e.preventDefault();
        const data = new FormData(e.target);
        this.emit(PopUpEvents.submit, {
            type: this.props.type,
            data
        })
    }

    showErrorMessage({ message }) {
        this.children.serverError.setProps({ errorMessage: message })
    }

    render(): DocumentFragment {
        return this.compile(template, { ...this.props });
    }
}