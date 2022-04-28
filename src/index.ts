import '../static/css/styles.css';
import '/static/icons/sprite.svg';
import Login from './pages/login/Login';
import Logout from './pages/logout/Logout';
import Register from './pages/register/Register';
import { Chat } from './pages/chat/Chat';
import Profile from './pages/profile/Profile';
import Error from './pages/error/Error';
import Router from './utils/Router';
import UserController from './controllers/UserController';
import { renderDOM } from './utils/renderDOM';
import PopUp from './components/popUp/PopUp';
import ModalController from './controllers/ModalController';

document.addEventListener('DOMContentLoaded', async () => {
    const linksContainer = document.getElementById('links') as HTMLElement;
    ModalController.init();
    
    Router
        .use('/messenger', Chat)
        .use('/settings', Profile)
        .use('/', Login)
        .use('/sign-up', Register)
        .use('/error', Error)
        .use('/logout', Logout)
        .start();

    // try {
    //     const isLoggedIn = await UserController.checkUserData();
    //     Router.go(isLoggedIn ? '/chat' : '/login');
    // } catch (e) {
    //     console.error(e);
    //     Router.go('/');
    // }

    Array.from(linksContainer.getElementsByClassName('link')).forEach(link => {
        link.addEventListener('click', ({ target }: Event & { target: { id: string } }) => {
            Router.go(`/${target?.id || ''}`)
        })
    });
})


