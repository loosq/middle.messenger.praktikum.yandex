import Block from "../../utils/Block";
import template from "./serverError.pug"
import "./serverError.css"

interface ServerErrorProps {
    label: string
}

export class ServerError extends Block<ServerErrorProps> {
    render() {
        return this.compile(template, {...this.props});
    }
}
