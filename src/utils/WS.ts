interface content {
    content: string
}

export class WS {
    _socket: WebSocket;
    constructor(url:string, onMessageCallBack = (data) => {}) {
        this._socket = new WebSocket(url);
        this._socket.addEventListener('open', () => {
            console.log('Соединение установлено');
        });
        this._socket.addEventListener('close', event => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });
        this._socket.addEventListener('error', (event: Event & {message: string}) => {
            console.log('Ошибка', event.message);
        });
        this._socket.addEventListener('message', event => {
            const {data} = event;
            console.log('Получены данные', data);

            if (typeof onMessageCallBack === 'function' && data) {
                onMessageCallBack(JSON.parse(data))
            }
        });
    }

    sendMessage(content: content) {
        this._socket.send(JSON.stringify({
            content,
            type: 'message',
        }));
    }

    getLastMessages(content: content) {
        this._socket.send(JSON.stringify({
            content,
            type: 'get old',
        }))
    }
}
