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
import ChangePassModal from "./fragments/changePassModal/ChangePassModal";
import Avatar from "./fragments/avatar/Avatar";

interface ProfileProps {
    isEdit?: boolean,
    events?: {
        [key: string]: (e: Event) => void
    },
    input?: HTMLInputElement | null
}

class Profile extends Block<ProfileProps> {
    constructor(props) {
        super(props);
        this.props = {
            ...props,
            events: {
                click: (e: Event & {target: {dataset: {href: string}}}) => {
                    const {href} = e.target?.dataset;

                    if (href) {
                        e.preventDefault();
                        e.stopImmediatePropagation();

                        switch (href) {
                            case '/changeData':
                                this.children.profileInputsList.setProps({isEdit: true});
                                this.children.button.setProps({isActive: true});
                                break;

                            case '/logout':
                                Router.go(href);
                                break;

                            case '/changePassword':
                                this.children.changePassModal.setProps({isPassModalVisible: true});
                                break;

                            case '/changeAvatar':
                                const input = this.getContent()?.querySelector('#avatar') as HTMLElement;
                                this.children.button.setProps({isActive: true});
                                if (input) {
                                    input.click();
                                }
                                break;
                        }
                    }
                },
                submit: async (e: Event & {target: HTMLFormElement}) => {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    if (e.target) {
                        const form = new FormData(e.target);
                        const avatar = form.get('avatar');
                        if (avatar) {
                            try {
                                await UserController.changeAvatar({data: avatar});
                            } catch (e) {
                                Store.set('error/profileForm', e.message);
                                this.children.button.setProps({isActive: false});
                                return;
                            }
                        }

                        //data.delete('avatar');
                        const formData = Object.fromEntries(form);
                        console.log(formData)
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
                            this.children.profileInputsList.setProps({isEdit: false});
                        } catch (e) {
                            console.error(e);
                            Store.set('error/profileForm', e.message);
                        }
                    }
                },
                change: async (e: Event & {target: {files: Blob[]}}) => {
                    if (e.target.files.length > 0) {
                        const file = e.target.files[0];
                        const src = URL.createObjectURL(file);
                        const preview = this.getContent()?.querySelector(".profile__img");
                        if (preview) {
                            preview['src'] = src;
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
        });
        this.children.goBackButton = new GoBackButton({});
        this.children.profileInputsList = new ProfileInputsList({
            isEdit: false
        });
        this.children.profileError = new ProfileError({label: ''});
        this.children.changePassModal = new ChangePassModal();
        this.children.avatar = new Avatar({});
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
