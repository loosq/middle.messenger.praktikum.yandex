import { PopUpProps } from "../../../components/popUp/PopUp";

export const chatDeletedError: PopUpProps = {
    type: 'chat-deleted-error',
    title: 'Не удалось удалить чат :(',
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