import Router from "../../utils/router/Router";
import {Chat} from "../chat/Chat";
import Profile from "../profile/Profile";
import Login from "../login/Login";
import Register from "../register/Register";
import Error from "../error/Error";
import Logout from "../logout/Logout";
import ModalController, {PopUpEvents} from "../../controllers/ModalController";
import loginConfig from "../login/config/loginConfig";
import GlobalEventBus from "../../utils/GlobalEventBus";
import registerConfig from "../register/config/registerConfig";
const { URLS: {messenger, settings, login, signUp, error, logout} } = require('./../../constants');

describe("Page", () => {
    beforeAll(() => {
        document.body.innerHTML = '<div id="root"></div><div id="modal"></div>';
        Router
            .use(messenger, Chat)
            .use(settings, Profile)
            .use(login, Login)
            .use(signUp, Register)
            .use(error, Error)
            .use(logout, Logout)
            .start();

        ModalController.init();
    });

    it('Chat should be rendered',  () => {
        Router.go(messenger);
        const element = document.querySelector('[data-test-id="chat"]');
        expect(element).toBeTruthy();
    });

    it('Profile should be rendered',  () => {
        Router.go(settings);
        const element = document.querySelector('[data-test-id="profile"]');
        expect(element).toBeTruthy();
    });

    it('Login should be rendered',  () => {
        GlobalEventBus.emit(PopUpEvents.show, loginConfig);
        const element = document.querySelector('[data-test-id="login"]');
        expect(element).toBeTruthy();
    });

    it('Register should be rendered',  () => {
        GlobalEventBus.emit(PopUpEvents.show, registerConfig);
        const element = document.querySelector('[data-test-id="sign-up"]');
        expect(element).toBeTruthy();
    });

    it('Error should be rendered',  () => {
        Router.go(error);
        const element = document.querySelector('[data-test-id="error"]');
        expect(element).toBeTruthy();
    });
})
