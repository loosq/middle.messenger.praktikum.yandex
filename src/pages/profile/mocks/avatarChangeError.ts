import { PopUpProps } from "../../../components/popUp/PopUp";

export const avatarChangeError: PopUpProps = {
    type: 'avatar-change-error',
    title: 'Что то пошло не так при изменени аватара',
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