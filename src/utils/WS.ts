import {EventBus} from "./EventBus";

export enum WSEvents {
    message = 'message',
}

export class WS extends EventBus {
    private _socket: WebSocket;

    constructor(url:string, chatId:string) {
        super();
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
            this.emit(WSEvents.message, {chatId, message: JSON.parse(data)});
        });
    }

    sendMessage(text: string) {
        this._socket.send(JSON.stringify({
            content: text,
            type: 'message',
        }));
    }

   getLastMessages() {
        this._socket.send(JSON.stringify({
            content: "0",
            type: 'get old',
        }))
    }
}
