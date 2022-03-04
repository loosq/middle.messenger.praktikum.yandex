import Block from "../../utils/Block";
import template from "./button.pug"

export class Button extends Block {

    render() {
        return this.compile(template, {...this.props});
    }
}
