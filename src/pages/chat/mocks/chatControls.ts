interface Control {
    text: string,
    icon: string
}

interface ChatControls {
    isControlsVisible: boolean
    controls: Control[],
};

const chatControls: ChatControls = {
    isControlsVisible: false,
    controls: [{
        text: "Добавить пользователя",
        icon: "cross"
    },
        {
            text: "Удалить пользователя",
            icon: "cross"
        }]
};

export default chatControls;
