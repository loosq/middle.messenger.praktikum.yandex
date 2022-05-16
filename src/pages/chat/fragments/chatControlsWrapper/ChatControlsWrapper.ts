import Block, {BlockProps} from "../../../../utils/Block";
import template from "./template.pug"
import {ChatControls} from "./fragments/chatControls/ChatControls";

interface ChatControlsWrapperProps extends BlockProps {
    isControlsVisible?: boolean
}

export class ChatControlsWrapper extends Block<ChatControlsWrapperProps> {
    constructor(props: ChatControlsWrapperProps = {}) {
        super({
            ...props,
            events: {
                click: () => this.setProps({isControlsVisible: !this.props.isControlsVisible})
            }
        });
    }

    initChildren() {
        this.children.chatControls = new ChatControls({});
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
