import { PopUpProps } from "../../../components/popUp/PopUp";


const loginConfig: PopUpProps = {
    type: 'login',
    title: 'Вход',
    inputs: [
        {
            name: 'login',
            label: 'Логин',
            errorMessage: 'Не верный логин',
            validateAs: 'login'
        },
        {
            name: 'password',
            label: 'Пароль',
            errorMessage: 'Не верный пароль',
            validateAs: 'password'
        }
    ],
    buttons: [
        {
            type: 'submit',
            value: 'Автаризоваться',
            isActive: false,
        }, {
            type: 'link',
            value: 'Нет аккаунта?',
            isActive: true
        }
    ]
}

export default loginConfig;
