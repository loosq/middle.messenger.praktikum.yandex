import {User} from "./store/types";

export const userTransform = (user: User) => {
    let result = {} as User;
    for (let key in user) {
        switch (key) {
            case 'first_name':
                result['firstName'] = user[key];
                break;
            case 'second_name':
                result['secondName'] = user[key];
                break;
            case 'display_name':
                result['displayName'] = user[key];
                break;
            default:
                result[key] = user[key];
        }
    }

    return result;
}
