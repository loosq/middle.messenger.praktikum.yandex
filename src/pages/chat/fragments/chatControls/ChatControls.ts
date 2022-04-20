import Block from "../../../../utils/Block";
import template from "./chatControls.pug"
import "./chatControls.css";

interface Control {
    text: string,
    icon: string
}

interface ChatControlsProps {
    isControlsVisible: boolean
    controls: Control[],
};

export class ChatControls extends Block<ChatControlsProps> {
    
    render() {
        return this.compile(template, {...this.props});
    }
}
