import PopUp, { PopUpProps } from "../components/popUp/PopUp";
import Block, { BlockProps } from "../utils/Block";
import { renderDOM } from "../utils/renderDOM";

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
        this.on(PopUpEvents.show, this.handlePopUpShow.bind(this));
        this.on(PopUpEvents.hide, this.handlePopUpHide.bind(this));
        this.on(PopUpEvents.showErrorMessage, this.handleShowErrorMessage.bind(this));
    }

    protected componentDidUnmount(): void {
        this.off(PopUpEvents.show, this.handlePopUpShow.bind(this));
        this.off(PopUpEvents.hide, this.handlePopUpHide.bind(this));
        this.off(PopUpEvents.showErrorMessage, this.handleShowErrorMessage.bind(this));
    }

    handlePopUpShow(data: PopUpProps) {
        console.log(data);
        
        this.component = new PopUp(data);
        this.type = data.type;
        renderDOM('#modal', this.component);
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