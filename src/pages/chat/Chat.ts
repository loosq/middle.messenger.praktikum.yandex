import Block from "../../utils/Block";
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
import store from "../../utils/Store";
import UserController from "../../controllers/UserController";

interface ChatProps {
    isControlsVisible: boolean,
    events?: object
}

export class Chat extends Block<ChatProps> {
    _state;
    constructor(props) {
        super(props);
        this._state = store.getState();
    }

    initChildren() {
        this.children.chatPreview = new ChatPreview({chatPreviewData});
        this.children.chatInput = new ChatInput();
        this.children.chatControls = new ChatControls({...chatControls});
        this.children.chatHeader = new ChatHeader();
        this.children.chatOperations = new ChatOperations({});
    }

    handleControlsClick = (isVisible) => {
        this.children.chatControls.setProps({isControlsVisible: !isVisible})
    }

    async componentDidMount() {
        this.props.isControlsVisible = false;
        this.props.events = {
            click: this.handleClick
        }
    }

    handleClick = (e: Event & {target: {dataset: {href: string}}}) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        const {href} = e?.target?.dataset;

        if (href === 'chat-controls') {
            this.handleControlsClick(this.props.isControlsVisible)
        } else {
            this.handleControlsClick(true)
        }
    }

    render() {
        return this.compile(template, {...this.props, chatData});
    }
}
