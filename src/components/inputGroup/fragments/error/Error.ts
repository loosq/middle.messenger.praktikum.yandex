import Block from "../../../../utils/Block";
import template from "./error.pug"

export class Error extends Block {

    render() {
        return this.compile(template, {...this.props});
    }
}
