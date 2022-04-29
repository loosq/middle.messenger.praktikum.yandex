import Block, { BlockProps } from "../../utils/Block";
import template from "./chat.pug"
import "./chat.css";
import { ChatPreview } from "./fragments/chatPreview/ChatPreview";
import { ChatInput } from "./fragments/chatInput/ChatInput";
import chatControls from "./mocks/chatControls";
import { ChatControls } from "./fragments/chatControls/ChatControls";
import { ChatHeader } from "./fragments/chatHeader/ChatHeader";
import ChatOperations from "./fragments/chatOperations/ChatOperations";
import Store, { StoreEvents } from "../../utils/Store";
import ChatsController from "../../controllers/ChatsController";
import UserController from "../../controllers/UserController";
import { MessagesList } from "./fragments/messagesList/MessagesList";
import { PopUpEvents } from "../../controllers/ModalController";
import { addChatData } from "./mocks/addChatData";
import { addUserData } from "./mocks/addUserData";

interface ChatProps extends BlockProps {
    isControlsVisible?: boolean
}

export class Chat extends Block<ChatProps> {
    currentChat: null | string;
    currentUserId: string | number;
    currentUserToChat: string | number;
    isMessagesLoading: boolean;
    openedChat;

    constructor(props: ChatProps) {
        super(props);
        this.currentChat = null;
        this.isMessagesLoading = Store.getState().isMessagesLoading;
        Store.on(StoreEvents.updated, this.onChangeState.bind(this));
        UserController.checkUserData();
        this.props.isControlsVisible = false;
        this.props.events = {
            click: this.handleClick.bind(this)
        }
        ChatsController.init();
    }

    onChangeState = () => {
        const state = Store.getState();

        if (+state.openedChat > 0) {
            this.children.chatInput.setProps({ chatOpen: true })
        }

        this.children.chatControls.setProps({ isControlsVisible: state.chatPreviews.length === 0 });
    }

    initChildren() {
        const state = Store.getState();
        const haveNoChats = state.chatPreviews.length === 0;
        this.children.chatPreview = new ChatPreview();
        this.children.chatInput = new ChatInput({ chatOpen: false });
        this.children.chatControls = new ChatControls({ controls: chatControls.controls, isControlsVisible: haveNoChats });
        this.children.chatHeader = new ChatHeader();
        this.children.chatOperations = new ChatOperations({});
        this.children.messagesList = new MessagesList();
    }

    handleControlsClick = (isVisible) => {
        this.children.chatControls.setProps({ isControlsVisible: !isVisible })
    }

    handleClick = (e: Event & { target: { dataset: { href: string, chatId: string, newChatUserId: number }, parentNode: HTMLElement } }) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        const { href, chatId, newChatUserId } = e.target.dataset;

        switch (href) {
            case 'chat-controls':
                this.handleControlsClick(this.props.isControlsVisible);
                break;
            case 'add-chat':
                this.children.chatControls.setProps({ isControlsVisible: false });
                this.emit(PopUpEvents.show, addChatData);
                break;
            // case 'add-user':
            //     this.children.chatControls.setProps({ isControlsVisible: false });
            //     this.emit(PopUpEvents.show, addChatData);
            //   break;

            case 'chat-preview':
                this.currentChat = chatId;
                this.currentUserToChat = chatId;
                Store.set('openedChat', String(chatId));
                break;
            case 'delete-user':
                console.log(this.currentChat, 'is going to be deleted');
                if (this.currentChat) {
                    ChatsController.delete(this.currentChat);
                    const chats = Object.keys(Store.getState().chatsMessages);
                    this.currentChat = chats[0] || null;
                }
                break;
            case 'add-user':
                this.children.chatControls.setProps({ isControlsVisible: false });
                this.emit(PopUpEvents.show, addUserData);
                break;
            case 'send-message':
                const currentChat = Store.getState().openedChat;
                const input = e.target.parentNode.querySelector('input');
                if (input && input.value && input.value.trim()) {
                    ChatsController.sendMessage(input.value, currentChat);
                    input.value = "";
                }
                break;
            default:
                console.log(href);
                this.handleControlsClick(true);
        }
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
