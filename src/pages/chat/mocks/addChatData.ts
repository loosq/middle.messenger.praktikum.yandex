import { PopUpProps } from "../../../components/popUp/PopUp";

export const addChatData: PopUpProps = {
    type: 'add-chat',
    title: 'Создать',
    inputs: [
        {
            name: 'title',
            label: 'Название чата',
            errorMessage: 'Поле не может быть пустым',
            validateAs: 'trim'
        }
    ],
    buttons: [
        {
            type: 'submit',
            value: 'Создать',
            isActive: false,
        }
    ]
}