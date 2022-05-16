import { PopUpProps } from "../../../components/popUp/PopUp";

export const userIsAdded: PopUpProps = {
    type: 'user-added-to-chat',
    title: 'Пользователь успешно добавлен в чат',
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