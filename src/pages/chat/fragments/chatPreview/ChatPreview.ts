import Block, { BlockProps } from "../../../../utils/Block";
import template from "./chatPreview.pug"
import "./chatPreview.css";
import { ChatPreview as ChatPreviewData } from "../../mocks/chatPreviewData";
import moment from 'moment';

interface ChatPreviewProps extends BlockProps {
    chatPreviewData: ChatPreviewData[]
};

export class ChatPreview extends Block<ChatPreviewProps> {

    render() {
        return this.compile(template, {...this.props, moment});
    }
}
