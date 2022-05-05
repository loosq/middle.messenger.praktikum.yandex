import { PopUpProps } from "../../../components/popUp/PopUp";

export const chatIsDeleted: PopUpProps = {
    type: 'chat-is-deleted',
    title: 'Чат успешно удалён',
    inputs: [],
    buttons: [
        {
            type: 'link',
            value: 'Закрыть',
            isActive: true,
            data: "close"
        }
    ],
    withTimeout: true
}