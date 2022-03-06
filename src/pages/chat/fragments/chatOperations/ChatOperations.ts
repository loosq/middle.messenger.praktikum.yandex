import Block from "../../../../utils/Block";
import template from "./chatOperations.pug"
import "./chatOperations.css";

export class ChatOperations extends Block<{}> {
    render() {
        return this.compile(template, {...this.props});
    }
}
