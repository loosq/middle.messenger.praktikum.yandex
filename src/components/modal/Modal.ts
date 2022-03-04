import Block from "../../utils/Block";
import template from "./modal.pug"
import "./modal.css";
import {Button} from "../button/Button";
import {InputGroup} from "../inputGroup/InputGroup";

export class Modal extends Block {

    render() {
        this.children.button = new Button({
            label: this.props.label,
            classNames: ['modal__submit-button', 'radiused', 'text-center', 'full-width']
        });
        this.children.inputGroups = this.props.inputs.map(({label, name, errorMessage, validateAs}) => {
            return new InputGroup({
                label,
                name,
                errorMessage,
                validateAs,
            })
        });

        return this.compile(template, {...this.props});
    }
}
