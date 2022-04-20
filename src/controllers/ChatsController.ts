import ChatsAPI, {NewChat, AddNewUserToChat} from "../api/chats/Chats";
import Store from "../utils/Store";
import Router from "../utils/Router";

interface NewChatData extends NewChat, AddNewUserToChat {};

class ChatsController {
    api;

    constructor() {
        this.api = ChatsAPI;
    }
    async setNewChat(data: NewChatData) {
        const newChatResponse = await this.api.create(data);
        if (!newChatResponse.reason) {
            const newUserAddResponse = await this.api.addUser(data);
            //TODO добавить в стор
            console.log(newUserAddResponse)
        }
    }
}

export default new ChatsController();
