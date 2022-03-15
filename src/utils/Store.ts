import {EventBus} from "./EventBus";

export enum StoreEvents {
    Updated = 'updated',
}

class Store extends EventBus {
    state;

    constructor() {
        super();
        this.state = {
            userLogin: '',
            userPassword: '',
            modalError: '',
            currentUser: '',
            userName: '',
            userEmail: '',
            userSecondName: '',
            userPhone: ''
        }
    }

    public set(key: string, value: any) {
        console.log('Setting store', {[key]: value})
        Object.assign(this.state, {[key]: value})
        this.emit(StoreEvents.Updated);
    };

    public getState() {
        return this.state;
    };
}

export default new Store();
