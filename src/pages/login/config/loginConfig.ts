interface Input {
    name: string,
    label: string,
    errorMessage?: string,
    validateAs: string
}

interface LoginConfig {
    label: string;
    inputs: Input[],
    button: string,
    link: string
}

const loginConfig: LoginConfig = {
    label: "Вход",
    inputs: [
        {
            name: "user_name",
            label: "Логин",
            errorMessage: "Не верный логин",
            validateAs: 'string'
        },
        {
            name: "user_password",
            label: "Пароль",
            errorMessage: "Не верный пароль",
            validateAs: 'string'
        }
    ],
    button: "Автаризоваться",
    link: "Нет аккаунта?"
}

export default loginConfig;
