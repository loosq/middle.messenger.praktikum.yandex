import { PopUpProps } from "../../../components/popUp/PopUp";

export const deleteChat: PopUpProps = {
    type: 'delete-chat',
    title: 'Вы точно хотите удалить чат?',
    inputs: [],
    buttons: [
        {
            type: 'submit',
            value: 'Да, хочу удалить',
            isActive: true,
        },
        {
            type: 'link',
            value: 'Закрыть',
            isActive: true,
            data: "close"
        }
    ]
}