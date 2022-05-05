import Block, { BlockProps } from "../../utils/Block";
import template from "./template.pug"
import "./styles.css"

export interface ButtonProps extends BlockProps {
    value: string,
    type?: 'button' | 'submit' | 'link',
    isActive?: boolean,
    data?: string,
    href?: string
}

export class Button extends Block<ButtonProps> {
    constructor(props: ButtonProps) {
        super(props);
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
