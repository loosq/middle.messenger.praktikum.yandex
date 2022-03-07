import Block from "../../../../utils/Block";
import template from "./chatControls.pug"
import "./chatControls.css";

interface ChatControlsElement {
    text: string,
    icon: string
}

interface ChatControlsProps {
    chatControls: ChatControlsElement[]
}

export class ChatControls extends Block<ChatControlsProps> {
    constructor(props: ChatControlsProps) {
        super(props);
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
