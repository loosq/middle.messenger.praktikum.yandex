const validate = (type, string) => {
    if (!type || !string) {
        throw Error('No params for validation');
    }

    if (typeof string !== 'string') {
        return false;
    }

    if (string === '' || string.trim() === '') {
        return false;
    }
    
    const validationType = {
        login: /^(?=.*[a-zA-Z-_])[a-zA-z0-9-_]{3,20}$/,
        password: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
        email: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
        name: /^[A-ZА-Я][a-zа-я-]*$/,
        phone: /^(\+)?\d{9,15}$/,
        trim: /^[^\s]/
    };

    return new RegExp(validationType[type]).test(string);
}

export default validate;
