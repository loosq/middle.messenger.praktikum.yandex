import { PopUpProps } from "../../../components/popUp/PopUp";

export const changePassword: PopUpProps = {
    type: 'change-password',
    title: 'Изменить пароль',
    inputs: [
        {
            name: 'oldPassword',
            label: 'Старый пароль',
            errorMessage: 'Поле не может быть пустым',
            validateAs: 'trim'
        },
        {
            name: 'newPassword',
            label: 'Новый пароль',
            errorMessage: 'Поле не может быть пустым',
            validateAs: 'trim'
        }
    ],
    buttons: [
        {
            type: 'submit',
            value: 'Изменить',
            isActive: false,
        },
        {
            type: 'link',
            value: 'Закрыть',
            isActive: true,
            data: "close"
        }
    ]
}