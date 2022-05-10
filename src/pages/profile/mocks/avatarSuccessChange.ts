import { PopUpProps } from "../../../components/popUp/PopUp";

export const avatarSuccessChange: PopUpProps = {
    type: 'avatar-change-success',
    title: 'Аватар успешно изменён',
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