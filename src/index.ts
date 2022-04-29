import '../static/css/styles.css';
import '/static/icons/sprite.svg';
import Login from './pages/login/Login';
import Logout from './pages/logout/Logout';
import Register from './pages/register/Register';
import { Chat } from './pages/chat/Chat';
import Profile from './pages/profile/Profile';
import Error from './pages/error/Error';
import Router from './utils/Router';
import ModalController from './controllers/ModalController';
const { URLS } = require('./constants.ts');

document.addEventListener('DOMContentLoaded', async () => {
    const linksContainer = document.getElementById('links') as HTMLElement;
    Router
        .use(URLS.messenger, Chat)
        .use(URLS.settings, Profile)
        .use(URLS.login, Login)
        .use(URLS.signUp, Register)
        .use(URLS.error, Error)
        .use(URLS.logout, Logout)
        .start();

    // try {
    //     const isLoggedIn = await UserController.checkUserData();
    //     Router.go(isLoggedIn ? '/chat' : '/login');
    // } catch (e) {
    //     console.error(e);
    //     Router.go('/');
    // }

    ModalController.init();
    // Array.from(linksContainer.getElementsByClassName('link')).forEach(link => {
    //     link.addEventListener('click', ({ target }: Event & { target: { id: string } }) => {
    //         Router.go(`/${target?.id || ''}`)
    //     })
    // });
})


