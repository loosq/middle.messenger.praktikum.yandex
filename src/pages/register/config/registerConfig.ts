interface RegisterConfig {
    title: string,
    buttonLabel: string,
    inputs: any,
    link: string,
    inputsValidationState: {},
    classNames: string[]
}

const registerConfig: RegisterConfig = {
    title: "Регистрация",
    inputs: [
        {
            name: "user_email",
            label: "Почта",
            errorMessage: "Введите почту",
            validateAs: 'email'
        },
        {
            name: "user_login",
            label: "Логин",
            errorMessage: "Введите логин",
            validateAs: 'login'
        },
        {
            name: "user_name",
            label: "Имя",
            errorMessage: "Введите имя",
            validateAs: 'name'
        },
        {
            name: "user_surname",
            label: "Фамилия",
            errorMessage: "Введите фамилию",
            validateAs: 'name'
        },
        {
            name: "user_phone",
            label: "Телефон",
            errorMessage: "Не корректный формат телефона",
            validateAs: 'phone'
        },
        {
            name: "user_password",
            label: "Пароль",
            errorMessage: "Введите пароль",
            validateAs: 'password'
        },
        {
            name: "user_password_repeat",
            label: "Пароль (ещё раз)",
            errorMessage: "Введите пароль ещё раз",
            validateAs: 'password'
        }
    ],
    buttonLabel: "Зарегистрироваться",
    link: "Войти",
    inputsValidationState: {},
    classNames: []
}

export default registerConfig;
