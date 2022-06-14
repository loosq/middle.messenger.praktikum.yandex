import PopUp, { PopUpProps } from '../components/popUp/PopUp';
import Block, { BlockProps } from '../utils/block/Block';
import { renderDOM } from '../utils/renderDOM';
const {MODAL_TIMEOUT, URLS} = require('../constants');

export enum PopUpEvents {
    show = 'show',
    hide = 'hide',
    submit = 'submit',
    click = 'click',
    change = 'change',
    showErrorMessage = 'showErrorMessage'
}

class ModalController extends Block<BlockProps> {
    type: string;
    component: PopUp;

    constructor() {
        super();
        this.registerEvents();
        this.addListener();
    }

    registerEvents(): void {
        this.on(PopUpEvents.show, this.handlePopUpShow.bind(this));
        this.on(PopUpEvents.hide, this.handlePopUpHide.bind(this));
        this.on(PopUpEvents.showErrorMessage, this.handleShowErrorMessage.bind(this));
    }

    componentDidUnmount(): void {
        this.off(PopUpEvents.show, this.handlePopUpShow.bind(this));
        this.off(PopUpEvents.hide, this.handlePopUpHide.bind(this));
        this.off(PopUpEvents.showErrorMessage, this.handleShowErrorMessage.bind(this));
    }

    handlePopUpShow(data: PopUpProps) {
        //console.log('New popup', data);
        this.component = new PopUp(data);
        this.type = data.type;

        renderDOM('#modal', this.component);
        if (data.withTimeout) {
            let timerId = setTimeout(() => {
                this.handlePopUpHide();
                clearTimeout(timerId)
            }, MODAL_TIMEOUT)
        }
    }

    addListener() {
        document.addEventListener('keydown', ({key}) => {
            const {pathname} = window.location;
            const noEscCloseModalPages = [URLS.login, URLS.signUp];

            if ('Escape' === key && !noEscCloseModalPages.includes(pathname)) {
                this.handlePopUpHide();
            }
        })
    }

    handlePopUpHide() {
        this.type = '';
        renderDOM('#modal');
    }

    handleShowErrorMessage(data) {
        this.component.showErrorMessage(data);
    }
}

export default new ModalController();
