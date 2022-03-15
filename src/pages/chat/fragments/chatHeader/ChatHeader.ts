import Block from "../../../../utils/Block";
import store from "../../../../utils/Store";
import template from "./chatHeader.pug"
import "./chatHeader.css";

export class ChatHeader extends Block<{}> {

    componentDidMount(oldProps: {} = {}) {
        const userName = store.getState()?.userName;
        this.setProps({userName})
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
