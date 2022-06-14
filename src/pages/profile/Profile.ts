import Block, {BlockProps} from "../../utils/block/Block";
import template from "./profile.pug"
import "./profile.css";
import {Button} from "../../components/button/Button";
import ProfileInputsList from "./fragments/profileInputsList/ProfileInputsList";
import GoBackButton from "./fragments/goBackButton/GoBackButton";
import Store from "../../utils/store/Store";
import withRouter from "../../utils/withRouter";
import Router from "../../utils/router/Router";
import UserController from "../../controllers/UserController";
import ProfileError from "./fragments/profileError/ProfileError";
import Avatar from "./fragments/avatar/Avatar";
import userActions from "./config/userActions";
import {PopUpEvents} from "../../controllers/ModalController";
const {URLS: {logout}} = require('./../../constants.ts');
import {changePassword, changePasswordSuccess, changeDataSuccess, changeDataError} from "./mocks";

interface ProfileProps extends BlockProps {
    isEdit?: boolean
}

class Profile extends Block<ProfileProps> {
    constructor(props: ProfileProps) {
        super({
            ...props,
            userActions,
            events: {
                click: (e: Event) => this.handleClick(e),
                change: async (e: Event & { target: { files: Blob[] } }) => {
                    if (e.target.files && e.target.files.length > 0) {
                        const file = e.target.files[0];
                        const formData = new FormData();
                        formData.append('avatar', file);
                        const changeAvaResult = await UserController.changeAvatar(formData);

                        const src = URL.createObjectURL(file);
                        const preview = (this.getContent() as HTMLElement).querySelector(".profile__img");
                        if (preview && changeAvaResult) {
                            preview['src'] = src;
                        }
                    }

                }
            }
        });
        this.subscribe();
    }

    subscribe() {
        this.on(PopUpEvents.submit, this.handleModalSubmit.bind(this));
    }

    async handleModalSubmit({type, data}) {
        if (type !== 'change-password') return;

        this.children.profileInputsList.setProps({isEdit: false});
        try {
            const response = await UserController.changePassword(data);
            if (response === 'OK') {
                this.emit(PopUpEvents.show, changePasswordSuccess)
            }
        } catch (e) {
            const error = JSON.parse(e);
            if (error.reason) {
                this.emit(PopUpEvents.showErrorMessage, {message: error.reason});
            }
        }
    }

    async handleClick(e) {
        const {href} = e?.target?.dataset;
        if (!href) return;

        e.preventDefault();
        switch (href) {
            case '/changeData':
                this.children.profileInputsList.setProps({isEdit: true});
                this.children.button.setProps({isActive: true});
                break;

            case '/logout':
                Router.go(logout);
                break;

            case '/changePassword':
                this.emit(PopUpEvents.show, changePassword);
                break;
            case '/changeAvatar':
                const input = (this.getContent() as HTMLElement).querySelector('#avatar');
                if (input instanceof HTMLElement) {
                    input.click();
                }
                break;
            case '/profileSave':
                const user = Store.getState().user;
                const form = e.target.closest('form');
                let requestPayload = {}
                const formData = new FormData(form);
                for (let pair of formData.entries()) {
                    requestPayload[pair[0]] = pair[1]
                }
                try {
                    let response = await UserController.updateData(requestPayload);
                    response = JSON.parse(response);
                    if (response.id) {
                        this.emit(PopUpEvents.show, changeDataSuccess);
                        Store.setUser(response);
                    }
                } catch (e) {
                    const error = JSON.parse(e);
                    if (error.reason) {
                        this.emit(PopUpEvents.show, changeDataError);
                        this.emit(PopUpEvents.showErrorMessage, {message: error.reason});
                        Store.setUser(user);
                    }
                }
                this.children.button.setProps({isActive: false});
                break;
        }
    }

    initChildren() {
        this.children.button = new Button({
            value: "Сохранить",
            isActive: false,
            type: 'submit',
            href: '/profileSave'
        });
        this.children.goBackButton = new GoBackButton();
        this.children.profileInputsList = new ProfileInputsList();
        this.children.profileError = new ProfileError({label: ''});
        this.children.avatar = new Avatar();
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

export default withRouter(Profile);
