import {EventBus} from "./EventBus";

export enum StoreEvents {
    Updated = 'updated',
}

class Store extends EventBus {
    state;

    constructor() {
        super();
        this.state = {}
    }

    public set(key: string, value: any) {
        Object.assign(this.state, {[key]: value})
        this.emit(StoreEvents.Updated);
    };
}

export default new Store();
