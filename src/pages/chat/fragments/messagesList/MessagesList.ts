import Block, {BlockProps} from "../../../../utils/block/Block";
import "./messagesList.css";
import template from "./messagesList.pug"
import moment from "moment"
import Store, {StoreEvents} from "../../../../utils/store/Store";

interface MessagesListProps extends BlockProps {
    userId: number | string,
    haveChats: boolean,
    moment: typeof moment
}

export class MessagesList extends Block<MessagesListProps> {
    constructor(props: BlockProps = {}) {
        super({
            ...props,
            userId: Store.getState().user.id,
            haveChats: Store.getState().chatPreviews.length !== 0,
            openedChat: Store.getState().openedChat,
             moment
        });

        Store.on(StoreEvents.updated, this.handleStoreUpdate.bind(this))
    }

    handleStoreUpdate() {
        const state = Store.getState();
        const openedChat = state.openedChat;
        const messages = state.chatsMessages[openedChat];

        if (Array.isArray(messages)) {
            this.setProps({messages});
        }

        if (this.props.userId !== state.user.id) {
            this.setProps({userId: state.user.id})
        }

        if (!openedChat) {
            this.setProps({
                messages: []
            });
        }
        this.setProps({openedChat});
        this.setProps({haveChats: state.chatPreviews.length !== 0});
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
