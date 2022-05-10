import Block, {BlockProps} from "../../../../../../utils/Block";
import template from "./template.pug"
import "./styles.css";
import controls, {Control} from "./../../../../mocks/chatControls";
import {PopUpEvents} from "../../../../../../controllers/ModalController";
import {addChatData} from "../../../../mocks/addChatData";
import {addUserData} from "../../../../mocks/addUserData";
import {deleteChat} from "../../../../mocks/deleteChat";

interface ChatControlsProps extends BlockProps {
    controls?: Control[]
}

export class ChatControls extends Block<ChatControlsProps> {
    constructor(props: ChatControlsProps) {
        super({
            ...props,
            events: {
                click: (e) => {
                    this.handleClick(e);
                }
            },
            controls
        });
    }

    handleClick(e: Event & { target: { dataset: { href: string } } }) {
        const {href} = e.target.dataset;
        switch (href) {
            case 'add-chat':
                this.emit(PopUpEvents.show, addChatData);
                break;
            case 'delete-user':
                console.log('delete user');
                break;
            case 'add-user':
                this.emit(PopUpEvents.show, addUserData);
                break;
            case 'delete-chat':
                this.emit(PopUpEvents.show, deleteChat);
                break;
            default:
                console.log(href);
        }
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
