import HTTPTransport from "../utils/HttpTransport";

export default abstract class BaseAPI {
    protected http: HTTPTransport;

    constructor(endpoint:string = '') {
        this.http = new HTTPTransport(endpoint);
    }

    create(data: unknown): Promise<unknown> {
        throw new Error('Not implemented');
    }

    read(data: unknown): Promise<unknown> {
        throw new Error('Not implemented');
    }

    update(data: unknown): Promise<unknown> {
        throw new Error('Not implemented');
    }

    delete(data?: unknown): Promise<unknown> {
        throw new Error('Not implemented');
    }
}
