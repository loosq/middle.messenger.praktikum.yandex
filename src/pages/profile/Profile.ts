import Block from "../../utils/Block";
import template from "./profile.pug"
import "./profile.css";
import userData from "./mocks/userData";
import userActions from "./mocks/userActions";
import {Button} from "../../components/button/Button";
import GoBackButton from "./fragments/goBackButton/GoBackButton";

export class Profile extends Block<{}> {
    constructor(props) {
        super(props);
    }

    initChildren() {
        this.children.button = new Button({label: "Сохранить", classNames: ['profile__submit']})
        this.children.goBackButton = new GoBackButton({});
    }

    render() {
        return this.compile(template, {userData, userActions});
    }
}
