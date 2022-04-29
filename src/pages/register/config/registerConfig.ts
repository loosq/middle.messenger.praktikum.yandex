import { PopUpProps } from "../../../components/popUp/PopUp";

const registerConfig: PopUpProps = {
    type: 'sign-up',
    title: "Регистрация",
    inputs: [
        {
            name: "email",
            label: "Почта",
            errorMessage: "Введите почту",
            validateAs: 'email'
        },
        {
            name: "login",
            label: "Логин",
            errorMessage: "Введите логин",
            validateAs: 'login'
        },
        {
            name: "first_name",
            label: "Имя",
            errorMessage: "Введите имя",
            validateAs: 'name'
        },
        {
            name: "second_name",
            label: "Фамилия",
            errorMessage: "Введите фамилию",
            validateAs: 'name'
        },
        {
            name: "phone",
            label: "Телефон",
            errorMessage: "Не корректный формат телефона",
            validateAs: 'phone'
        },
        {
            name: "password",
            label: "Пароль",
            errorMessage: "Введите пароль",
            validateAs: 'password'
        },
        {
            name: "password_repeat",
            label: "Пароль (ещё раз)",
            errorMessage: "Введите пароль ещё раз",
            validateAs: 'password'
        }
    ],
    buttons: [
        {
            type: 'submit',
            value: 'Зарегистрироваться',
            isActive: false,
        }, {
            type: 'link',
            value: 'Войти',
            isActive: true,
            data: "/"
        }
    ]
}

export default registerConfig;
