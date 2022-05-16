import HTTPTransport from "../utils/HttpTransport";
const {Constants: {API_URL}} = require('../constants');

export default abstract class BaseAPI {
    protected http: HTTPTransport;

    constructor(endpoint:string = '') {
        this.http = new HTTPTransport(API_URL + endpoint);
    }

    public abstract create?(data: unknown): Promise<unknown>;

    public abstract read?(identifier?: string): Promise<unknown>;

    public abstract update?(data: unknown): Promise<unknown>;

    public abstract delete?(identifier: string): Promise<unknown>;
}
