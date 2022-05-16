import { PopUpProps } from "../../../components/popUp/PopUp";

export const changeDataSuccess: PopUpProps = {
    type: 'change-data-success',
    title: 'Данные успешно изменены',
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