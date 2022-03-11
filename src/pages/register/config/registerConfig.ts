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
    buttonLabel: "Зарегистрироваться",
    link: "Войти",
    inputsValidationState: {},
    classNames: []
}

export default registerConfig;
