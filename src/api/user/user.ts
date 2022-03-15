import HTTP from '../../utils/HttpTransport';
import BaseAPI from '../api';

const {API_URL} = require('../../constants.ts');

const userAPIInstance = new HTTP();

export default class UserAPI extends BaseAPI {
    create(options): Promise<unknown> {

        const requestOptions = {
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
            },
            ...options
        };

        return userAPIInstance
            .post(`${API_URL}/auth/signup`, {...requestOptions})
            .then((res) => res);
    }

    request() {
        //return userAPIInstance.get();
    }

    login(options): Promise<unknown> {
        const requestOptions = {
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
            },
            ...options
        };

        return userAPIInstance
            .post(`${API_URL}/auth/signin`, {...requestOptions})
            .then((res) => res);
    }

    update() {
        //return userAPIInstance.post();
    }

    delete() {
        //return userAPIInstance.delete();
    }
}
