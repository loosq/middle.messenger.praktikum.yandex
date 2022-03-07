import Block from "../../../../utils/Block";
import template from "./input.pug"

interface InputProps {
    name: string,
    value?: string,
    events?: object
}

export class Input extends Block<InputProps> {
    constructor(props: InputProps) {
        super(props);
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
