import Block from "../../utils/Block";
import template from "./button.pug"
import "./button.css"

interface ButtonProps {
    label: string,
    type?: string,
    isActive?: boolean,
    classNames?: string[]
}

export class Button extends Block<ButtonProps> {
    render() {
        return this.compile(template, {...this.props});
    }
}
