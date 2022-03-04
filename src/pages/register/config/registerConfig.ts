interface Input {
    name: string,
    label: string,
    errorMessage?: string,
    validateAs: string
}

interface RegisterConfig {
    label: string;
    inputs: Input[],
    button: string,
    link: string
}

const registerConfig: RegisterConfig = {
    label: "Регистрация",
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
            validateAs: 'string'
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
            validateAs: 'string'
        },
        {
            name: "user_password_repeat",
            label: "Пароль (ещё раз)",
            errorMessage: "Введите пароль ещё раз",
            validateAs: 'string'
        }
    ],
    button: "Зарегистрироваться",
    link: "Войти"
}

export default registerConfig;
