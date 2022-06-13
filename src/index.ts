import '../static/css/styles.css';
import Login from './pages/login/Login';
import Logout from './pages/logout/Logout';
import Register from './pages/register/Register';
import { Chat } from './pages/chat/Chat';
import Profile from './pages/profile/Profile';
import Error from './pages/error/Error';
import Router from './utils/router/Router';
import ModalController from './controllers/ModalController';
const { URLS: {messenger, settings, login, signUp, error, logout} } = require('./constants.ts');

document.addEventListener('DOMContentLoaded', async () => {
    Router
        .use(messenger, Chat)
        .use(settings, Profile)
        .use(login, Login)
        .use(signUp, Register)
        .use(error, Error)
        .use(logout, Logout)
        .start();

    ModalController.init();
})


