const Methods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH'
};

function queryStringify(data) {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

interface Options {
    method?: string,
    headers?: {
        [key: string]: string
    },
    data?: unknown
}

export default class HTTPTransport {
    static API_URL = 'https://ya-praktikum.tech/api/v2';
    protected endpoint: string;

    constructor(endpoint:string = '') {
        this.endpoint = `${HTTPTransport.API_URL}${endpoint}`
    }

    public get<Response>(path = '/'): Promise<Response> {
        return this.request<Response>(this.endpoint + path);
    };

    public post<Response = void>(path = '/', data?: unknown): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {
            method: Methods.POST,
            data
        })
    };

    public put<Response = void>(path = '/', options: Options): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {
            method: Methods.PUT,
            ...options
        });
    };

    public patch<Response = void>(path = '/', data: unknown): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {
            method: Methods.PATCH,
            data
        });
    };

    public delete<Response>(path = '/'): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {method: Methods.DELETE});
    };


    private request<Response>(url: string, options: Options = {method: Methods.GET}, timeout: number = 5000): Promise<Response> {
        const {headers = {}, method, data} = options;
        const defaultHeaders = {
            "accept": "application/json",
            "Content-Type": "application/json",
        };

        return new Promise((resolve, reject) => {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === Methods.GET;
            xhr.withCredentials = true;

            xhr.open(
                method,
                isGet && !!data
                    ? `${url}${queryStringify(data)}`
                    : url,
            );

            Object.entries({...defaultHeaders, ...headers}).forEach(([key, value]) => {
                xhr.setRequestHeader(key, value);
            });

            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status < 400) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.onabort = () => reject({reason: 'abort'});
            xhr.onerror = () => reject({reason: 'network error'});
            xhr.ontimeout = () => reject({reason: 'timeout error'});

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}
