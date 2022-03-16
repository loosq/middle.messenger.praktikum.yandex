import {EventBus} from "./EventBus";

interface User {
    current: string | number,
    login: string,
    password: string,
    name: string,
    email: string,
    secondName: string,
    phone: string
}

interface Error {
    modalForm: ''
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
                current: '',
                login: '',
                password: '',
                name: '',
                email: '',
                secondName: '',
                phone: ''
            },
            error: {
                modalForm: ''
            }
        }
    }

    public set(key: string, value: any) {
        let valueToMerge;

        // key поддерживает запись только 1 уровня вложенности
        if (key.includes('/')) {
            const keySplit = key.split('/');
            valueToMerge = {[keySplit[0]]: {[keySplit[1]]: value}}
        } else {
            valueToMerge = {[key]: value};
        }

        console.log('Setting store', valueToMerge)
        Object.assign(this.state, valueToMerge);
        this.emit(StoreEvents.Updated);
    };

    public getState() {
        return this.state;
    };
}

export default new Store();
