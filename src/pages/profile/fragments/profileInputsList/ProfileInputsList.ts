import Block, {BlockProps} from "../../../../utils/Block";
import template from "./profileInputsList.pug"
import "./profileInputsList.css";
import Store, {StoreEvents} from "../../../../utils/Store";
import {isEqual} from "../../../../utils/lodash";

interface userInputProp {
    key: string,
    name: string,
    value: string
}

interface ProfileInputsListProps extends BlockProps {
    isEdit?: boolean,
    user?: {
        displayName: string,
        email: string,
        login: string,
        firstName: string,
        phone: string,
        secondName: string
    },
    userInputsData?: userInputProp[]
}

class ProfileInputsList extends Block<ProfileInputsListProps> {
    constructor(props: ProfileInputsListProps = {}) {
        super({...props, isEdited: false});
        Store.on(StoreEvents.updated, this.handleStoreUpdate.bind(this));
        this.handleStoreUpdate();
    }

    handleStoreUpdate(): void {
        const {user: {login, firstName, secondName, phone, email, displayName}} = Store.getState();
        const user = {login, firstName, secondName, phone, email, displayName};
        const isUserDataEqual = isEqual(user, this.props.user!);

        if (!isUserDataEqual) {
            this.props.user = user;
            this.setUserInputs(user);
        }
    }

    setUserInputs({login, firstName, secondName, phone, email, displayName}): void {
        const userInputsData = [
            {
                key: 'Почта',
                value: email,
                name: 'email'
            },
            {
                key: 'Логин',
                value: login,
                name: 'login'
            },
            {
                key: 'Имя',
                value: firstName,
                name: 'first_name'
            },
            {
                key: 'Фамилия',
                value: secondName,
                name: 'second_name'
            },
            {
                key: 'Телефон',
                value: phone,
                name: 'phone'
            },
            {
                key: 'Отображаемое имя',
                value: displayName,
                name: 'display_name'
            }
        ];
        this.setProps({userInputsData})
    }


    render() {
        return this.compile(template, {...this.props});
    }
}

export default ProfileInputsList;
