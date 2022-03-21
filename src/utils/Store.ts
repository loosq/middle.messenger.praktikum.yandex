import {EventBus} from "./EventBus";

interface User {
    id: string | number,
    login: string,
    password: string,
    name: string,
    email: string,
    secondName: string,
    phone: string,
    displayName: string
}

interface Error {
    modalForm: string,
    profileForm: string
}

interface State {
    user: User,
    error: Error
}

export enum StoreEvents {
    Updated = 'updated',
}

class Store extends EventBus {
    state: State;

    constructor() {
        super();
        this.state = {
            user: {
                id: '',
                login: '',
                password: '',
                name: '',
                email: '',
                secondName: '',
                phone: '',
                displayName: ''
            },
            error: {
                modalForm: '',
                profileForm: ''
            }
        }
    }

    public set(key: string, value: any) {
        let valueToMerge;

        // key поддерживает запись только 1 уровня вложенности
        if (key.includes('/')) {
            const keySplit = key.split('/');
            Object.assign(this.state[keySplit[0]], {[keySplit[1]]: value});
        } else {
            valueToMerge = {[key]: value};
            Object.assign(this.state, valueToMerge);
        }
        console.log('Setting store', this.state)
        this.emit(StoreEvents.Updated);
    };

    public getState() {
        return this.state;
    };
}

export default new Store();
