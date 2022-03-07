import Block from "../../../../utils/Block";
import template from "./chatPreview.pug"
import "./chatPreview.css";

interface ChatPreviewElement {
    avatar: string,
    name: string,
    chat: string,
    time: string,
    count: number
}

interface ChatPreviewProps {
    chatPreviewData: ChatPreviewElement
}

export class ChatPreview extends Block<{}> {
    constructor(props: ChatPreviewProps) {
        super(props);
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
