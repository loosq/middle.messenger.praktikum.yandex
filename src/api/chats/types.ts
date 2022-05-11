export interface NewChat {
    title: string
}

export interface AddNewUserToChat {
    users: number[],
    chatId: number
}

export interface CreatedChatResponse {
    "id": number,
    "title": string,
    "avatar": string,
    "unread_count": number,
    "last_message": {
        "user": {
            "first_name": string,
            "second_name": string,
            "avatar": string,
            "email": string,
            "login": string,
            "phone": string
        },
        "time": string,
        "content": string
    }
}

export interface TokenResponse {
    token: string
}

export interface DeletedChatResponse {
    chatId: string
}

export interface ChatUsersResponse {
    "id": number,
    "first_name": string,
    "second_name": string,
    "display_name": string,
    "login": string,
    "email": string,
    "phone": string,
    "avatar": string,
    "role": string
}
