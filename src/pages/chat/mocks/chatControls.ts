interface Control {
    text: string,
    icon: string,
    href: string
}

interface ChatControls {
    isControlsVisible: boolean
    controls: Control[],
};

const chatControls: ChatControls = {
    isControlsVisible: false,
    controls: [
        {
            text: "Создать новый чат",
            icon: "cross",
            href: "add-chat"
        },
        {
            text: "Добавить пользователя",
            icon: "cross",
            href: "add-user"
        },
        {
            text: "Удалить пользователя",
            icon: "cross",
            href: "delete-user"
        }
    ]
};

export default chatControls;
