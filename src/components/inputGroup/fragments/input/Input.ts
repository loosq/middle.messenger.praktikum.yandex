import Block, { BlockProps } from "../../../../utils/Block";
import template from "./input.pug"

interface InputProps extends BlockProps {
    name: string,
    value?: string
}

export class Input extends Block<InputProps> {
    
    render() {
        return this.compile(template, {...this.props});
    }
}
