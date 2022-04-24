import Block, { BlockProps } from "../../../../utils/Block";
import template from "./chatPreview.pug"
import "./chatPreview.css";
import chatPreviewData, { ChatPreview as ChatPreviewData } from "../../mocks/chatPreviewData";
import moment from 'moment';

interface chatPreview extends ChatPreviewData {
    isChosen: boolean
};

interface ChatPreviewProps extends BlockProps {
    chatPreviewData: chatPreview[]
};

export class ChatPreview extends Block<ChatPreviewProps> {

    chooseChat(chatId) {
        if (Array.isArray(this.props.chatPreviewData)) {
            const chatPreviewData = this.props.chatPreviewData.map((item) => item.isChosen = item.id == chatId)
            this.setProps(chatPreviewData);
        }
    }

    render() {
        console.log(this.props.chatPreviewData)
        return this.compile(template, {...this.props, moment});
    }
}
