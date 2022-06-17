import Block, { BlockProps } from "../../utils/block/Block";
import "./usersList.css";
import template from "./usersList.pug";

interface User {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
    avatar: string
  }

interface UsersListProps extends BlockProps{
    usersList?: User[]
}

export class UsersList extends Block<UsersListProps> {
    
    render() {
        return this.compile(template, {...this.props});
    }
}
