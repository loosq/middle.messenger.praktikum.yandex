import {User} from "./Store";

export const userTransform = (user: User) => {
    let result = {} as User;
    for (let key in user) {
        if (key === 'first_name') {
            result['firstName'] = user[key];
        } else if (key === 'second_name') {
            result['secondName'] = user[key];
        } else if (key === 'display_name') {
            result['displayName'] = user[key];
        } else {
            result[key] = user[key]
        }
    }

    return result;
}