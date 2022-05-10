import { PopUpProps } from "../../../components/popUp/PopUp";

export const chatIsCreated: PopUpProps = {
    type: 'chat-is-created',
    title: 'Чат успешно создан',
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