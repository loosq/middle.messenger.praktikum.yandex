export default class BaseAPI {
    create(args: any): Promise<unknown> {
        throw new Error('Not implemented');
    }

    request() {
        throw new Error('Not implemented');
    }

    update() {
        throw new Error('Not implemented');
    }

    delete() {
        throw new Error('Not implemented');
    }
}
