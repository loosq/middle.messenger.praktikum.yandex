import Block from "../../../../utils/Block";
import template from "./chatHeader.pug"
import "./chatHeader.css";

export class ChatHeader extends Block {
    render() {
        return this.compile(template, {...this.props});
    }
}
