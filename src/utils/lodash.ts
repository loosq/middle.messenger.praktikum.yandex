type Indexed<T = any> = {
    [key in string]: T;
};

const trim = (string: string, chars?: string): string => {
    if (string && !chars) {
        return string.trim();
    }

    const reg = new RegExp(`[${chars}]`, "gi");
    return string.replace(reg, "");
};

const merge = (target: Indexed, source: Indexed): Indexed => {
    for (let p in source) {
        if (!source.hasOwnProperty(p)) {
            continue;
        }

        try {
            if (source[p].constructor === Object) {
                source[p] = merge(target[p] as Indexed, source[p] as Indexed);
            } else {
                target[p] = source[p];
            }
        } catch (e) {
            target[p] = target[p];
        }
    }

    return target;
};

const set = (object: Indexed | unknown, path: string, value: unknown): Indexed | unknown => {
    if (typeof object !== 'object' || object === null) {
        return object;
    }

    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }

    const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
        [key]: acc,
    }), value as any);
    return merge(object as Indexed, result);
};

const isPlainObject = (object: unknown): object is Indexed => {
    return object !== null && typeof object === 'object' && object.constructor === Object && Object.prototype.toString.call(object) === ['object Object']
};

const isArray = (value: unknown): value is [] => {
    return Array.isArray(value);
};

const isArrayOrObject = (value: unknown): value is [] | Indexed => {
    return isPlainObject(value) || isArray(value);
};

const isEqual = (a: Indexed, b: Indexed) => {
    if (!isArrayOrObject(a) || !isArrayOrObject(b)) {
        return false;
    }

    const entriesA = Object.entries(a);
    const entriesB = Object.entries(b);

    if (entriesA.length !== entriesB.length) {
        return false;
    }

    return entriesA.every(([keyA, valueA]) => {
        const valueB = isArray(b) ? b[Number(keyA)] : b[keyA];

        if (isArrayOrObject(valueA) && isArrayOrObject(valueB)) {
            return isEqual(valueA, valueB);
        }

        return Object.is(valueA, valueB);
    });
};

const randomIntInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export {isEqual, trim, merge, set, randomIntInRange};
