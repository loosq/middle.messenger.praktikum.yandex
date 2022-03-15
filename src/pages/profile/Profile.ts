import Block from "../../utils/Block";
import template from "./profile.pug"
import "./profile.css";
import userActions from "./mocks/userActions";
import {Button} from "../../components/button/Button";
import GoBackButton from "./fragments/goBackButton/GoBackButton";
import store from "../../utils/Store";

export class Profile extends Block<{}> {

    initChildren() {
        this.children.button = new Button({
            label: "Сохранить",
            classNames: ['profile__submit']
        })
        this.children.goBackButton = new GoBackButton({});
    }

    componentDidMount() {
        const {userLogin, userName, userEmail, userSecondName, userPhone} = store.getState();
        const userData = [
            {
                key: 'Почта',
                value: userEmail
            },
            {
                key: 'Логин',
                value: userLogin
            },
            {
                key: 'Имя',
                value: userName
            },
            {
                key: 'Фамилия',
                value: userSecondName
            },
            {
                key: 'Телефон',
                value: userPhone
            }];

        this.setProps({userName, userData, userActions})
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
