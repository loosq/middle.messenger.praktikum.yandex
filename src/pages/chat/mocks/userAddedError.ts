import { PopUpProps } from "../../../components/popUp/PopUp";

export const userAddedError: PopUpProps = {
    type: 'user-added-to-chat-error',
    title: 'Не удалось добавить пользователя в чат',
    inputs: [],
    buttons: [
        {
            type: 'link',
            value: 'Закрыть',
            isActive: true,
            data: "close"
        }
    ],
}