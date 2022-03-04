import Block from "../../../../utils/Block";
import template from "./chatInput.pug"
import "./chatInput.css";

export class ChatInput extends Block {
    render() {
        return this.compile(template, {...this.props});
    }
}
