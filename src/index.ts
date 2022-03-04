import '../static/css/styles.css';
import '/static/icons/sprite.svg';
import {renderDOM} from './utils/renderDOM';
import {Chat} from "./pages/chat/Chat";

document.addEventListener('DOMContentLoaded', () => {
    const component = new Chat()
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


