import {State} from "./types";

const defaultState: State = {
    user: {
        id: '',
        login: '',
        password: '',
        email: '',
        secondName: '',
        firstName: '',
        phone: '',
        displayName: '',
        avatar: '',
        searchedUsers: [],
        chats: []
    },
    chatPreviews: [],
    chatsMessages: {},
    isMessagesLoading: false,
    openedChat: ""
}

export default defaultState;