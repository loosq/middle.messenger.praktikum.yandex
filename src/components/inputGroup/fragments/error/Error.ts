import Block, { BlockProps } from "../../../../utils/block/Block";
import template from "./template.pug"
import "./styles.css";

interface ErrorProps extends BlockProps {
    isValid: boolean,
    errorMessage?: string,
    isModalError?: false
}

export class Error extends Block<ErrorProps> {
    render() {
        return this.compile(template, { ...this.props });
    }
}
