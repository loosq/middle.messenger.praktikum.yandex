import {sum} from './components/sum';

const root = document.querySelector('#root');
root.textContent = sum(6, -1).toString();