import {EventBus} from "./EventBus";

interface User {
    id: string | number,
    login: string,
    password: string,
    name: string,
    email: string,
    secondName: string,
    phone: string,
    displayName: string,
    avatar: string,
    searchedUsers?: string[],
    chats?: []
}

interface Error {
    modalForm: string,
    profileForm: string
}

interface Chats {
    chats?: {[key: string]: WebSocket}
}

interface ChatsMessages {
    chatsMessages?: {[key: string]: []}
}

interface State {
    user: User,
    error: Error,
    chats: Chats,
    chatsMessages: ChatsMessages,
    isMessagesLoading: boolean
}

export enum StoreEvents {
    Updated = 'updated',
}

class Store extends EventBus {
    state: State;

    constructor() {
        super();
        this.state = {
            user: {
                id: '',
                login: '',
                password: '',
                name: '',
                email: '',
                secondName: '',
                phone: '',
                displayName: '',
                avatar: '',
                searchedUsers: [],
                chats: []
            },
            error: {
                modalForm: '',
                profileForm: ''
            },
            chats: {},
            chatsMessages: {},
            isMessagesLoading: false
        }
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
        console.log('Setting store', this.state)
        this.emit(StoreEvents.Updated);
    };

    public getState() {
        return this.state;
    };
}

export default new Store();
