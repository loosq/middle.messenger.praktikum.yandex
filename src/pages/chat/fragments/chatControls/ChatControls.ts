import Block from "../../../../utils/Block";
import template from "./chatControls.pug"
import "./chatControls.css";

export class ChatControls extends Block {
    render() {
        return this.compile(template, {...this.props});
    }
}
