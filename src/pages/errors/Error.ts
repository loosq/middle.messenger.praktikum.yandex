import Block from "../../utils/Block";
import template from "./error.pug"
import errorData from "./mocks/errors"

export class Error extends Block {

    render() {
        return this.compile(template, {label: errorData[0].label, subLabel: errorData[0].subLabel });
    }
}
