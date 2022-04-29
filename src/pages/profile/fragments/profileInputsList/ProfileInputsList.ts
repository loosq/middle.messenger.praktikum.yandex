import Block, { BlockProps } from "../../../../utils/Block";
import template from "./profileInputsList.pug"
import "./profileInputsList.css";
import Store, { StoreEvents } from "../../../../utils/Store";

interface ProfileInputsListProps extends BlockProps {
    isEdit?: boolean
}

class ProfileInputsList extends Block<{}> {
    constructor() {
        super();
        Store.on(StoreEvents.updated, this.handleStoreUpdate.bind(this))
    }

    handleStoreUpdate() {
        const { user: { login, name, secondName, phone, email, displayName } } = Store.getState();
        const userData = [
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
                value: name,
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
        console.log(userData);

        this.setProps({ userData });
    }


    render() {
        return this.compile(template, { ...this.props });
    }
}

export default ProfileInputsList;
