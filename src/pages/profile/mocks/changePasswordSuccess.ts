import { PopUpProps } from "../../../components/popUp/PopUp";

export const changePasswordSuccess: PopUpProps = {
    type: 'change-password-success',
    title: 'Пароль успешно изменён',
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