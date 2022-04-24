import Block, { BlockProps } from "../../utils/Block";
import template from "./chat.pug"
import "./chat.css";
import {ChatPreview} from "./fragments/chatPreview/ChatPreview";
import {ChatInput} from "./fragments/chatInput/ChatInput";
import chatControls from "./mocks/chatControls";
import chatPreviewData from "./mocks/chatPreviewData";
import {ChatControls} from "./fragments/chatControls/ChatControls";
import {ChatHeader} from "./fragments/chatHeader/ChatHeader";
import ChatOperations from "./fragments/chatOperations/ChatOperations";
import Store, {StoreEvents} from "../../utils/Store";
import { AddUser } from "../../components/addUser/AddUser";
import ChatsController from "../../controllers/ChatsController";
import { MessagesList } from "./fragments/messagesList/MessagesList";

interface ChatProps extends BlockProps {
    isControlsVisible: boolean,
    isAddUserVisible: boolean
}

export class Chat extends Block<ChatProps> {
    currentChat: null | string;
    currentUserId: string | number;
    currentUserToChat: string | number;
    isMessagesLoading: boolean;

    constructor(props: ChatProps) {
        super(props);
        this.currentChat = null;
        this.isMessagesLoading = Store.getState().isMessagesLoading;
        Store.on(StoreEvents.Updated, this.onChangeState);
    }

    onChangeState = () => {
        const {chats, id} = Store.getState().user;

        const {isMessagesLoading} = Store.getState();
        this.currentUserId = id;
        if (chats?.length) {
            // @ts-ignore
            chats.forEach(chat => ChatsController.setUserChat(chat.id));
            this.children.chatPreview.setProps({chatPreviewData: chats});
        }

        if (this.currentChat) {
            this.currentUserId = id;
            const messages = Store.getState().chatsMessages[this.currentChat];
            this.children.messagesList.setProps({messages});
        }
        this.setProps({isMessagesLoading});

    }

    initChildren() {
        this.children.chatPreview = new ChatPreview({chatPreviewData});
        this.children.chatInput = new ChatInput();
        this.children.chatControls = new ChatControls(chatControls);
        this.children.chatHeader = new ChatHeader();
        this.children.chatOperations = new ChatOperations({});
        this.children.addUser = new AddUser({isAddUserVisible: false});
        this.children.messagesList = new MessagesList();
    }

    handleControlsClick = (isVisible) => {
        this.children.chatControls.setProps({isControlsVisible: !isVisible})
    }

    componentDidMount() {
        this.props.isControlsVisible = false;
        this.props.events = {
            click: this.handleClick
        }
        ChatsController.getUserChats();
    }

    handleClick = (e: Event & {target: {dataset: {href: string, chatId: string, newChatUserId: number}, parentNode: HTMLElement}}) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        const {href, chatId, newChatUserId} = e.target.dataset;

        switch (href) {
            case 'chat-controls':
                this.handleControlsClick(this.props.isControlsVisible)
                break;
            case 'add-user':
                this.children.addUser.setProps({isAddUserVisible: true});
                this.children.chatControls.setProps({isControlsVisible: false});
                break;
            case 'add-user-close-button':
                this.children.addUser.setProps({isAddUserVisible: false});
                break;
            case 'chat-preview':
                this.currentChat = chatId;
                this.currentUserToChat = chatId;
                this.children.chatPreview.chooseChat(this.currentChat);
                Store.set('isMessagesLoading', true);
                ChatsController.setUserMessages(chatId);
                break;
            case 'delete-user':
                console.log(this.currentChat, 'is going to be deleted')
                if (this.currentChat) {
                    ChatsController.deleteChat(this.currentChat)
                    this.currentChat = null;
                }
                break;
            case 'add-user-to-chat':
                const currentUser = Store.getState().user.id;
                ChatsController.setNewChat({users: [currentUser, +newChatUserId], title: "new chat"});
                this.children.addUser.setProps({isAddUserVisible: false});
                break;
            case 'send-message':
                const input = e.target.parentNode.querySelector('input')
                if (input && input.value && input.value.trim()) {
                    ChatsController.sendMessage(input.value, this.currentChat);
                    input.value = "";
                }
                break;
            default:
                console.log(href)
                this.handleControlsClick(true)
        }
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
