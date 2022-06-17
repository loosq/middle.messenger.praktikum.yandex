import Store, {StoreEvents} from "../Store";
import exp from "constants";

describe("store" , () => {
    const id = 5;
    const changeStore = () => {
        const user = {id}
        Store.setUser(user);
    }
    const addChat = (chat) => {
        Store.addChatPreview(chat);
    }
    const addMessageToChat = (chatId, message) => {
        addChat({id: chatId});
        Store.addMessageToChat(message, chatId);
    }

    beforeEach(() => Store.restState());

    it("should change state", () => {
        changeStore();
        expect(Store.getState().user.id).toEqual(id);
    });

    it("should fire event", () => {
        const handleUpdate = jest.fn();
        Store.on(StoreEvents.updated, handleUpdate);
        changeStore();
        expect(handleUpdate).toHaveBeenCalledTimes(1);
    });

    it("should add chat preview", () => {
        const id = "4";
        addChat({id});
        expect(Store.getState().chatPreviews[0].id).toEqual(id);
    });

    it("should remove chat preview", () => {
        const chatId = "5";
        addChat({id: chatId});
        Store.removeChatPreview(chatId);
        expect(Store.getState().chatPreviews.find(({id}) => id === chatId)).toBeFalsy()
    });

    it("should add message to chat", () => {
        const chatId = "6";
        const message = "message";
        addMessageToChat(chatId, message);
        expect(Store.getState().chatsMessages[chatId].includes(message)).toBeTruthy();
    });

    it("should remove chat", () => {
        const chatId = "9";
        const message = "message";
        addMessageToChat(chatId, message);
        Store.removeChat(chatId);
        expect(chatId in Store.getState().chatsMessages).toBeFalsy();
    });
})