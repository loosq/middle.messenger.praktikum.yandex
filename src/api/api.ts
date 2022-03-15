import HTTPTransport from "../utils/HttpTransport";

export default class BaseAPI {
    protected http: HTTPTransport;

    constructor(endpoint) {
        this.http = new HTTPTransport(endpoint);
    }

    create(data: unknown): Promise<unknown> {
        throw new Error('Not implemented');
    }

    read(identifier?: string): Promise<unknown> {
        throw new Error('Not implemented');
    }

    update(identifier: string): Promise<unknown> {
        throw new Error('Not implemented');
    }

    delete(identifier: string): Promise<unknown> {
        throw new Error('Not implemented');
    }
}
