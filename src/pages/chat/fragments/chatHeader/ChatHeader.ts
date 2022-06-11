import Block, {BlockProps} from "../../../../utils/Block";
import {StoreEvents} from "../../../../utils/store/Store";
import template from "./chatHeader.pug"
import "./chatHeader.css";
import Store from "../../../../utils/store/Store";
import ChatsController from "../../../../controllers/ChatsController";
const {Constants: {RESOURCES_URL}} = require('../../../../constants');

interface ChatHeaderProps extends BlockProps {
    openedChat?: string | number;
    userToChat?: boolean | object
}

export class ChatHeader extends Block<ChatHeaderProps> {
    openedChat: string | number;

    constructor(props: ChatHeaderProps = {}) {
        super({
            ...props,
            userToChat: false,
            resourcesUrl: RESOURCES_URL,
        });
        Store.on(StoreEvents.updated, this.handleStoreUpdate.bind(this));
    }

    async handleStoreUpdate() {
        const {openedChat} = Store.getState();
        if ((this.openedChat != openedChat) && openedChat) {
            this.openedChat = openedChat;
            const userToChat = await ChatsController.setChatUser(openedChat);
            this.setProps({userToChat});
        }

        if (!openedChat) {
            this.setProps({userToChat: false})
        }
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
