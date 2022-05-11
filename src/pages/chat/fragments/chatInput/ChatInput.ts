import Block, {BlockProps} from "../../../../utils/Block";
import template from "./chatInput.pug"
import "./chatInput.css";
import Store, {StoreEvents} from "../../../../utils/Store";
import ChatsController from "../../../../controllers/ChatsController";

interface ChatInputProps extends BlockProps {
    chatOpen?: boolean
}

export class ChatInput extends Block<ChatInputProps> {
    constructor(props: ChatInputProps = {}) {
        super({
            ...props,
            events: {
                submit: (e) => {
                    const input = e.target.querySelector('input')
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    const {openedChat} = Store.getState();

                    if (input.value && input.value.trim) {
                        ChatsController.addMessage(input.value, openedChat);
                        input.value = '';
                    }
                }
            }
        });
        Store.on(StoreEvents.updated, this.handleStoreChange.bind(this));
    }

    handleStoreChange() {
        const {openedChat} = Store.getState();
        this.setProps({chatOpen: !!openedChat})
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
