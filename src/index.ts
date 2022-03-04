import '../static/css/styles.css';
import '/static/icons/sprite.svg';
import {renderDOM} from './utils/renderDOM';
import {Register} from "./pages/register/Register";
import {Login} from "./pages/login/Login";

document.addEventListener('DOMContentLoaded', () => {
    const component = new Login()
    renderDOM('#root', component);


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


