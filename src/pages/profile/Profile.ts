import Block from "../../utils/Block";
import template from "./profile.pug"
import "./profile.css";
import {Button} from "../../components/button/Button";
import GoBackButton from "./fragments/goBackButton/GoBackButton";
import store from "../../utils/Store";

export class Profile extends Block<{}> {
    constructor() {
        super();
        this.props = {
            events: {
                click: (e) => console.log(e)
            }
        }
    }
    initChildren() {
        this.children.button = new Button({
            label: "Сохранить",
            classNames: ['profile__submit'],
            events: {
                click: (e) => console.log(e)
            },
            isActive: true
        })
        this.children.goBackButton = new GoBackButton({});
    }

    handleClick = (e) => {
        const {href} = e.target.dataset;
        const {$router} = this.props;

        if (href && $router) {
            e.preventDefault();
            e.stopImmediatePropagation();

            $router.go(href)
        }
    };

    componentDidMount() {
        const {user: {login, name, secondName, phone, email}} = store.getState();
        const userData = [
            {
                key: 'Почта',
                value: email
            },
            {
                key: 'Логин',
                value: login
            },
            {
                key: 'Имя',
                value: name
            },
            {
                key: 'Фамилия',
                value: secondName
            },
            {
                key: 'Телефон',
                value: phone
            }];
        const userActions = [
            {
                key: 'Изменить данные',
                action: 'changeData'
            },
            {
                key: 'Изменить пароль',
                action: 'changePassword'
            },
            {
                key: 'Выйти',
                action: 'changePassword'
            }
        ]

        this.setProps({name, userData, userActions})
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
