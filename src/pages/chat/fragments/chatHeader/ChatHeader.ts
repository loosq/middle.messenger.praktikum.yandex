import Block, {BlockProps} from "../../../../utils/Block";
import {StoreEvents} from "../../../../utils/Store";
import template from "./chatHeader.pug"
import "./chatHeader.css";
import Store from "../../../../utils/Store";
import ChatsController from "../../../../controllers/ChatsController";
const {Constants: {RESOURCES_URL}} = require('../../../../constants');

interface ChatHeaderProps extends BlockProps {
    openedChat?: string | number;
}

export class ChatHeader extends Block<ChatHeaderProps> {
    openedChat: string | number;

    constructor(props: ChatHeaderProps) {
        super({
            ...props,
            userToChat: {},
            resourcesUrl: RESOURCES_URL,
        });
        Store.on(StoreEvents.updated, this.handleStoreUpdate.bind(this));
    }

    async handleStoreUpdate() {
        const openedChat = Store.getState().openedChat;
        if (this.openedChat != openedChat) {
            this.openedChat = openedChat;
            const userToChat = await ChatsController.setChatUser(openedChat);
            this.setProps({userToChat})
        }
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
