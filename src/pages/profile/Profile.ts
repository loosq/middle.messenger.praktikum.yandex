import Block from "../../utils/Block";
import template from "./profile.pug"
import "./profile.css";
import {Button} from "../../components/button/Button";
import ProfileInputsList from "./fragments/profileInputsList/ProfileInputsList";
import GoBackButton from "./fragments/goBackButton/GoBackButton";
import Store, {StoreEvents} from "../../utils/Store";
import withRouter from "../../utils/withRouter";
import Router from "../../utils/Router";
import {UserDataCreate} from "../../api/user/User";
import UserController from "../../controllers/UserController";
import ProfileError from "./fragments/profileError/ProfileError";

interface ProfileProps {
    isEdit?: boolean,
    events?: {
        [key: string]: (e: Event) => void
    }
}

class Profile extends Block<ProfileProps> {
    constructor(props) {
        super(props);
        this.props = {
            events: {
                click: (e: Event) => {
                    const {href} = e.target?.dataset;

                    if (href) {
                        e.preventDefault();
                        e.stopImmediatePropagation();

                        switch (href) {
                            case '/changeData':
                                this.children.profileInputsList.setProps({isEdit: !this.children.profileInputsList.props.isEdit});
                                this.children.button.setProps({isActive: true});
                                break;

                            case '/logout':
                                Router.go(href);
                                break;
                        }
                    }
                },
                submit: async (e) => {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    if (e.target) {
                        // @ts-ignore
                        const formData = Object.fromEntries(new FormData(e.target)) as UserDataCreate;

                        if (Object.values(formData).some(v => !v)){
                            Store.set('error/profileForm', 'Some values are missing!');
                            return;
                        }

                        try {
                            const response = await UserController.updateData(formData);
                            console.log(response, JSON.parse(response))
                            const {id, first_name, second_name, avatar, login, phone, email, display_name} = JSON.parse(response);
                            Store.set('user/login', login);
                            Store.set('user/id', id);
                            Store.set('user/name', first_name);
                            Store.set('user/displayName', display_name);
                            Store.set('user/secondName', second_name);
                            Store.set('user/email', email);
                            Store.set('user/phone', phone);
                            Store.set('user/avatar', avatar);
                            Store.set('error/profileForm', '');
                            this.children.button.setProps({isActive: false});
                        } catch (e) {
                            console.error(e);
                            Store.set('error/profileForm', e.message);
                        }
                    }
                }
            }
        }

        Store.on(StoreEvents.Updated, this.onChangeState);
    }

    onChangeState = () => {
        const state = Store.getState();
        const {profileForm} = state.error;
        this.children.profileError.setProps({label: profileForm});
    };

    initChildren() {
        this.children.button = new Button({
            label: "Сохранить",
            classNames: ['profile__submit'],
            events: {
                click: (e) => console.log(e)
            }
        })
        this.children.goBackButton = new GoBackButton({});
        this.children.profileInputsList = new ProfileInputsList({
            isEdit: false
        });
        this.children.profileError = new ProfileError({label: ''})
    }

    componentDidMount() {
        const {user: {name}} = Store.getState();

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
                action: 'logout'
            }
        ];
        this.setProps({name, userActions});
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

export default withRouter(Profile);
