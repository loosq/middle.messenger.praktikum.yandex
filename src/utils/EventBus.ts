export class EventBus {
    private listeners;

    constructor() {
        this.listeners = {};
    }

    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event, callback) {
        if (!this.listeners[event]) {
            console.error(`Нет события, то бы отписаться: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }

    emit(event, ...args) {
        
        if (!this.listeners[event]) {
            return;
        }

        this.listeners[event].forEach(function(listener) {
            //console.log(`EventBus: exec event: ${event}`)
             listener(...args);
        });
    }
}
