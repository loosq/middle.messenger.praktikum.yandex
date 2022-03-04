import Block from "../../../../utils/Block";
import template from "./chatPreview.pug"
import "./chatPreview.css";

export class ChatPreview extends Block {

    render() {
        return this.compile(template, {...this.props});
    }
}
