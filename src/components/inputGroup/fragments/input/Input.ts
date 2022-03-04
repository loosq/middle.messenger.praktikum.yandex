import Block from "../../../../utils/Block";
import template from "./input.pug"

export class Input extends Block {

    render() {
        return this.compile(template, {...this.props});
    }
}
