import Block from "../../../../utils/Block";
import template from "./error.pug"

interface ErrorProps {
    isValid: boolean,
    errorMessage?: string
}

export class Error extends Block<ErrorProps> {
    constructor(props: ErrorProps) {
        super(props);
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
