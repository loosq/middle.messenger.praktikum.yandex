import Block from "../../../../utils/Block";
import "./messagesList.css";
import template from "./messagesList.pug"
import moment from "moment"
import Store from "../../../../utils/Store";

export class MessagesList extends Block<{}> {

    render() {
        return this.compile(template, {...this.props, currentUserId: Store.getState().user.id ,moment});
    }
}
