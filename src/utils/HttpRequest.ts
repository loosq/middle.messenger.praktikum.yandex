const Methods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
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
    method: string,
    timeout?: number,
    data?: Document | XMLHttpRequestBodyInit,
    headers?: object
}
class HTTPTransport {
    get = (url, options: Options) => {

        return this.request(url, {...options, method: Methods.GET}, options.timeout);
    };

    post = (url, options: Options) => {
        return this.request(url, {...options, method: Methods.POST}, options.timeout);
    };

    put = (url, options: Options) => {
        return this.request(url, {...options, method: Methods.PUT}, options.timeout);
    };

    delete = (url, options: Options) => {
        return this.request(url, {...options, method: Methods.DELETE}, options.timeout);
    };

    request = (url, options: Options, timeout = 5000) => {
        const {headers = {}, method, data} = options;

        return new Promise(function(resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === Methods.GET;

            xhr.open(
                method,
                isGet && !!data
                    ? `${url}${queryStringify(data)}`
                    : url,
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}
