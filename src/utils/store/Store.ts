import {EventBus} from "../EventBus";
import {State} from "./types";
import {userTransform} from "../userTransfrom";
import defaultState from "./config";


export enum StoreEvents {
    updated = 'updated',
}

class Store extends EventBus {
    state: State;

    constructor() {
        super();
        this.restState();
    }

    restState() {
        this.state = JSON.parse(JSON.stringify(defaultState));
    }

    // Мутации, возможно вынести в отдельный файл
    addChatPreview(chatPreview) {
        const chatPreviews = this.state['chatPreviews'];
        const hasChatPreview = chatPreviews.find(({id}) => id === chatPreview.id);
        if (!hasChatPreview) {
            chatPreviews.push(chatPreview);
            this.state.chatsMessages[chatPreview.id] = [];
            this.emit(StoreEvents.updated);
        }
    }

    removeChatPreview(chatId) {
        const haveChat = this.state.chatPreviews.some(({id}) => id === chatId);
        if (haveChat) {
            this.state.chatPreviews = this.state.chatPreviews.filter(({id}) => id !== chatId);
            this.emit(StoreEvents.updated);
        }
    }

    removeChat(chatId) {
        if (chatId in this.state.chatsMessages) {
            delete this.state.chatsMessages[chatId];
            this.emit(StoreEvents.updated);
        }
    }

    addMessageToChat(message, openedChat) {
        const chat = this.state['chatsMessages'][openedChat];
        if (Array.isArray(chat)) {
            chat.push(message);
            this.emit(StoreEvents.updated);
        }
    }

    setUser(user) {
        this.state.user =  userTransform(user);
        this.emit(StoreEvents.updated);
    }

    public set(key: string, value: any) {
        let valueToMerge;

        if (key.includes('/')) {
            const keySplit = key.split('/');
            Object.assign(this.state[keySplit[0]], {[keySplit[1]]: value});
        } else {
            valueToMerge = {[key]: value};
            Object.assign(this.state, valueToMerge);
        }
        //console.log('Setting store', this.state)
        this.emit(StoreEvents.updated);
    };

    public getState() {
        return this.state;
    };
}

export default new Store();
