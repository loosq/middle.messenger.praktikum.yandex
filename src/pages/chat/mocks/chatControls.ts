export interface Control {
    text: string,
    icon: string,
    href: string
}

const controls: Control[] = [
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
    },
    {
        text: "Удалить чат",
        icon: "cross",
        href: "delete-chat"
    }
];

export default controls;
