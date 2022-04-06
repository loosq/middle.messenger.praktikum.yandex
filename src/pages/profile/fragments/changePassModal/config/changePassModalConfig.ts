const changePassModalConfig = {
    title: "Изменить пароль",
    buttonLabel: "Изменить",
    inputs: [
        {
            name: "oldPassword",
            label: "Старый пароль",
            errorMessage: "Не корректно указан пароль",
            validateAs: 'password'
        },
        {
            name: "newPassword",
            label: "Новый пароль",
            errorMessage: "Не корректно указан пароль",
            validateAs: 'password'
        }
    ],
    link: null
}

export default changePassModalConfig;
