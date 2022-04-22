import Block, { BlockProps } from "../../utils/Block";
import { UsersList } from "../usersList/UsersList";
import template from "./addUser.pug"
import "./addUser.css";
import { Input } from "../inputGroup/fragments/input/Input";
import UserController from "../../controllers/UserController";
import Store, { StoreEvents } from "../../utils/Store";

interface AddUserProps extends BlockProps {
    isAddUserVisible: boolean
}

export class AddUser extends Block<AddUserProps> {
    constructor(props: AddUserProps) {
        super(props)
        this.onChangeState = this.onChangeState.bind(this);
        Store.on(StoreEvents.Updated, this.onChangeState);
    }
    initChildren() {
        this.children.usersList = new UsersList();
        this.children.input = new Input({
            value: '',
            name: 'add-user-input',
            classList: ['add-user-input'],
            events: {
                input: this.handleInputChange,
                click: this.handleClick
            }
        });
    }


    handleInputChange(e: Event & { target: { value: string } }) {
        UserController.findUsers(e.target.value)
    }

    handleClick(e: Event & { target: { value: string } }) {
        console.log(e);
    }

    onChangeState() {
        const usersList = Store.getState().user.searchedUsers;
        this.children.usersList.setProps({usersList})
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
