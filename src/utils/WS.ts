import { EventBus } from "./EventBus";

export enum WSEvents {
    message = 'message',
    closed = 'closed',
    open = 'open'
}

export enum WSReadyStates {
    connecting = 0,
    open = 1,
    closing = 2,
    closed = 3
}

export class WS extends EventBus {
    private _socket: WebSocket;

    constructor(url: string, chatId: string) {
        super();
        this._socket = new WebSocket(url);

        this._socket.addEventListener('open', () => {
            //console.log('Соединение установлено');
            this.emit(WSEvents.open, { chatId });
        });

        this._socket.addEventListener('close', event => {
            if (event.wasClean) {
                //console.log('Соединение закрыто чисто');
            } else {
                //console.log('Обрыв соединения');
            }

            //console.log(`Код: ${event.code} | Причина: ${event.reason}`);
            this.emit(WSEvents.closed, { chatId });
        });

        this._socket.addEventListener('error', (event: Event & { message: string }) => {
            //console.log('Ошибка', event.message);
        });

        this._socket.addEventListener('message', event => {
            const { data } = event;
            this.emit(WSEvents.message, { chatId, message: JSON.parse(data) });
        });
    }

    sendMessage(text: string) {
        this._socket.send(JSON.stringify({
            content: text,
            type: 'message',
        }));
    }

    sendPing() {
        this._socket.send(JSON.stringify({type: 'ping'}));
    }

    getLastMessages() {
        this._socket.send(JSON.stringify({
            content: "0",
            type: 'get old',
        }))
    }

    close() {
        this._socket.close();
    }

    get getReadyState() {
        return this._socket.readyState;
    }
}
