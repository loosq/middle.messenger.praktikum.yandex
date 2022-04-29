import Block from "../../../../utils/Block";
import "./messagesList.css";
import template from "./messagesList.pug"
import moment from "moment"
import Store, { StoreEvents } from "../../../../utils/Store";

export class MessagesList extends Block<{}> {
    userId;
    haveChats;
    constructor() {
        super();
        Store.on(StoreEvents.updated, this.handleStoreUpdate.bind(this))
    }

    handleStoreUpdate() {
        const state = Store.getState();
        const openedChat = state.openedChat;
        const messages = state.chatsMessages[openedChat];

        if (Array.isArray(messages)) {
            this.setProps({ messages });
        }

        if (this.userId !== state.user.id) {
            this.userId = state.user.id;
        }

        this.setProps({ haveChats: state.chatPreviews.length !== 0 });
    }

    render() {
        return this.compile(template, { ...this.props, currentUserId: this.userId, moment });
    }
}
