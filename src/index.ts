import '../static/css/styles.css';
import '/static/icons/sprite.svg';
import {Login} from "./pages/login/Login";
import {Register} from "./pages/register/Register";
import {Chat} from "./pages/chat/Chat";
import {Profile} from "./pages/profile/Profile";
import {Error} from "./pages/error/Error";

const setPage = id => {
    history.replaceState(null, '', `/${id}`);
    const appEl = document.getElementById('root') as HTMLElement;
    // @ts-ignore
    appEl?.innerHTML = '';
    switch (id) {
        case 'login':
            appEl?.appendChild(new Login().getContent()!);
            break;
        case 'register':
            appEl?.appendChild(new Register().getContent()!);
            break;
        case 'profile':
            appEl?.appendChild(new Profile().getContent()!);
            break;
        case 'error':
            appEl?.appendChild(new Error().getContent()!);
            break;
        case 'chat':
            appEl?.appendChild(new Chat().getContent()!);
            break;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const linksContainer = document.getElementById('links') as HTMLElement;

    setPage('login');

    Array.from(linksContainer.getElementsByClassName('link')).forEach(link => {
        link.addEventListener('click', event => {
            // @ts-ignore
            const {id} = event.target;
            setPage(id);
        })
    });

    document.addEventListener("submit", (e) => {
        e.preventDefault();
        let res = {};
        const form = e.target as HTMLElement;
        if (form) {
            const inputs = form.querySelectorAll('input');
            [...inputs].forEach(input => res[input.name] = input.value);

            console.log(res)
        }
    })
})


