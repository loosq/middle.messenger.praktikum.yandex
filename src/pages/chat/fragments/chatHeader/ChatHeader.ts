import Block from "../../../../utils/Block";
import store from "../../../../utils/Store";
import template from "./chatHeader.pug"
import "./chatHeader.css";
const {RESOURCES_URL} = require('../../../../constants');

export class ChatHeader extends Block<{}> {

    componentDidMount(oldProps: {} = {}) {
        //@ts-ignore
        const userName = store.getState()?.userName;
        this.setProps({userName})
    }

    render() {
        return this.compile(template, {...this.props, resourcesUrl: RESOURCES_URL});
    }
}
