export interface User {
    id: string | number,
    login: string,
    password?: string,
    email: string,
    firstName: string,
    secondName: string,
    phone: string,
    displayName: string,
    avatar: string,
    searchedUsers?: string[],
    chats?: []
}

export interface ChatPreviewDefault {
    id: number | string,
    title: string,
    avatar: string,
    unread_count: number,
    last_message: {
        user: {
            first_name: string,
            second_name: string,
            avatar: string,
            email: string,
            login: string,
            phone: string
        },
        time: string,
        content: string
    }
}

export interface ChatPreview extends ChatPreviewDefault {
    isChosen?: boolean
}

export interface ChatsMessages {
    chatsMessages?: { [key: string]: [] }
}

export interface State {
    user: User,
    chatPreviews: ChatPreview[],
    chatsMessages: ChatsMessages,
    isMessagesLoading: boolean,
    openedChat: string
}