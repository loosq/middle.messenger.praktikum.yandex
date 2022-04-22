import Block, { BlockProps } from "../../utils/Block";
import template from "./chat.pug"
import "./chat.css";
import {ChatPreview} from "./fragments/chatPreview/ChatPreview";
import {ChatInput} from "./fragments/chatInput/ChatInput";
import chatControls from "./mocks/chatControls";
import chatPreviewData from "./mocks/chatPreviewData";
import chatData from "./mocks/chatData";
import {ChatControls} from "./fragments/chatControls/ChatControls";
import {ChatHeader} from "./fragments/chatHeader/ChatHeader";
import ChatOperations from "./fragments/chatOperations/ChatOperations";
import Store, {StoreEvents} from "../../utils/Store";
import UserController from "../../controllers/UserController";
import { AddUser } from "../../components/addUser/AddUser";
import ChatsController from "../../controllers/ChatsController";
import { MessagesList } from "./fragments/messagesList/MessagesList";

interface ChatProps extends BlockProps {
    isControlsVisible: boolean,
    isAddUserVisible: boolean
}

export class Chat extends Block<ChatProps> {
    constructor(props: ChatProps) {
        super(props);
        Store.on(StoreEvents.Updated, this.onChangeState);
    }

    onChangeState = () => {
        const {chats} = Store.getState().user;
        if (chats?.length) {
            this.children.chatPreview.setProps({chatPreviewData: chats});
        }
    }

    initChildren() {
        this.children.chatPreview = new ChatPreview({chatPreviewData});
        this.children.chatInput = new ChatInput();
        this.children.chatControls = new ChatControls(chatControls);
        this.children.chatHeader = new ChatHeader();
        this.children.chatOperations = new ChatOperations({});
        this.children.addUser = new AddUser({isAddUserVisible: false});
        this.children.messagesList = new MessagesList({chatData})
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

    handleClick = (e: Event & {target: {dataset: {href: string, chatId: string, newChatUserId: number}}}) => {
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
                console.log(this.children.addUser);
                break;
            case 'add-user-close-button':
                this.children.addUser.setProps({isAddUserVisible: false});
                break;
            case 'chat-preview':
                console.log('chatId', chatId);
                break;
            case 'add-user-to-chat':
                const currentUser = Store.getState().user.id;
                ChatsController.setNewChat({users: [currentUser, +newChatUserId], title: "new chat"});
                this.children.addUser.setProps({isAddUserVisible: false});
                break;
            default: 
                console.log(href);
                this.handleControlsClick(true)
        }
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
