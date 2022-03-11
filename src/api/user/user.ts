import HTTP from '../../utils/HttpRequest';
import BaseAPI from '../api';
const {API_URL} = require('../../constants.ts');

const userAPIInstance = new HTTP();

export default class UserAPI extends BaseAPI {
    static create(options: object = {}): Promise<unknown> {
        return userAPIInstance
            .post(`${API_URL}/auth/signup`, {...options})
            .then((res) => res);
    }

    request() {
        //return userAPIInstance.get();
    }

    update() {
        //return userAPIInstance.post();
    }

    delete() {
        //return userAPIInstance.delete();
    }
}
