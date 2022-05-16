import { PopUpProps } from "../../../components/popUp/PopUp";

export const changeDataError: PopUpProps = {
    type: 'change-data-error',
    title: 'Ошибка при изменении данных',
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