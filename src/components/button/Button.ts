import Block from "../../utils/Block";
import template from "./button.pug"
import "./button.css"

interface ButtonProps {
    label: string,
    type?: string
    classNames?: string[]
}

export class Button extends Block<ButtonProps> {
    render() {
        console.log(this.props)
        return this.compile(template, {...this.props});
    }
}
