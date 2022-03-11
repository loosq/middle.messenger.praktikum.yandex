import '../static/css/styles.css';
import '/static/icons/sprite.svg';
import {Login} from "./pages/login/Login";
import {Register} from "./pages/register/Register";
import {Chat} from "./pages/chat/Chat";
import {Profile} from "./pages/profile/Profile";
import Error from "./pages/error/Error";
import Router from "./utils/Router";

document.addEventListener('DOMContentLoaded', () => {
    const linksContainer = document.getElementById('links') as HTMLElement;
    const router = new Router('#root');

    router
        .use("/chat", Chat)
        .use("/profile", Profile)
        .use("/login", Login)
        .use("/register", Register)
        .use("/error", Error)
        .start();

    Array.from(linksContainer.getElementsByClassName('link')).forEach(link => {
        link.addEventListener('click', ({target}: Event & {target: {id:string}}) => {
            router.go(`/${target?.id || ''}`)
        })
    });
})


