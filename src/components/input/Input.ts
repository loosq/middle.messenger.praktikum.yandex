import Block, { BlockProps } from "./../../utils/Block";
import template from "./template.pug";
import "./styles.css"

interface InputProps extends BlockProps {
    name: string,
    value?: string,
    placeholder?: string
}

export class Input extends Block<InputProps> {
    constructor(props: InputProps) {
        super(props);
    }
    render() {
        return this.compile(template, {...this.props});
    }
}
