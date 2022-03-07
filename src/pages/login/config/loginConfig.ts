interface LoginConfig {
    title: string,
    buttonLabel: string,
    inputs: any,
    link: string,
    inputsValidationState: {},
    classNames: string[]
}

const loginConfig: LoginConfig = {
    title: "Вход",
    buttonLabel: "Автаризоваться",
    inputs: [
        {
            name: "user_name",
            label: "Логин",
            errorMessage: "Не верный логин",
            validateAs: 'login'
        },
        {
            name: "user_password",
            label: "Пароль",
            errorMessage: "Не верный пароль",
            validateAs: 'password'
        }
    ],
    link: "Нет аккаунта?",
    inputsValidationState: {},
    classNames: []
}

export default loginConfig;
