import Block from "../../utils/Block";
import template from "./profile.pug"
import "./profile.css";
import userData from "./mocks/userData";
import userActions from "./mocks/userActions";
import {Button} from "../../components/button/Button";

export class Profile extends Block {

    initChildren() {
        this.children.button = new Button({label: "Сохранить", classNames: ['profile__submit']})
    }

    render() {
        return this.compile(template, {userData, userActions});
    }
}
