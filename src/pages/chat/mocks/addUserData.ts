import { PopUpProps } from "../../../components/popUp/PopUp";

export const addUserData: PopUpProps = {
    type: 'add-user',
    title: 'Добавить пользователя',
    inputs: [
        {
            name: 'userId',
            label: 'Логин пользователя',
            errorMessage: 'Введите логин пользователя',
            validateAs: 'trim',
            sendOnChangeEvent: true
        }
    ],
    buttons: [
        {
            type: 'submit',
            value: 'Добавить',
            isActive: false,
        },
        {
            type: 'link',
            value: 'Закрыть',
            isActive: true,
            data: 'close'
        }
    ]
}