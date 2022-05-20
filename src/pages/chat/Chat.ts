import Block, { BlockProps } from "../../utils/Block";
import template from "./chat.pug"
import "./chat.css";
import { ChatPreview } from "./fragments/chatPreview/ChatPreview";
import { ChatInput } from "./fragments/chatInput/ChatInput";
import { ChatControlsWrapper } from "./fragments/chatControlsWrapper/ChatControlsWrapper";
import { ChatHeader } from "./fragments/chatHeader/ChatHeader";
import ChatOperations from "./fragments/chatOperations/ChatOperations";
import ChatsController from "../../controllers/ChatsController";
import { MessagesList } from "./fragments/messagesList/MessagesList";


export class Chat extends Block<BlockProps> {
    constructor(props: BlockProps) {
        super(props);
        ChatsController.init();
    }

    initChildren() {
        this.children.chatPreview = new ChatPreview();
        this.children.chatInput = new ChatInput();
        this.children.chatControlsWrapper = new ChatControlsWrapper({});
        this.children.chatHeader = new ChatHeader();
        this.children.chatOperations = new ChatOperations();
        this.children.messagesList = new MessagesList();
    }

    componentDidUnmount() {
        ChatsController.onDestroy();
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
