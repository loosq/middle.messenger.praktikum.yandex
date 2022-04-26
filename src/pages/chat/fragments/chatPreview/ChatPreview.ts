import Block, { BlockProps } from "../../../../utils/Block";
import template from "./chatPreview.pug"
import "./chatPreview.css";
import moment from 'moment';
import Store, { StoreEvents } from "../../../../utils/Store";
const { RESOURCES_URL } = require('../../../../constants');
interface User {
    first_name: string,
    second_name: string,
    avatar: string,
    email: string,
    login: string,
    phone: string
};

export interface ChatPreviewDataDefault {
    id: number,
    title: string,
    avatar: string,
    unread_count: number,
    last_message: {
        user: User,
        time: string,
        content: string
    }
};

export interface ChatPreviewDefault extends ChatPreviewDataDefault {
    isChosen?: boolean
};

export interface ChatPreviewProps extends BlockProps {
    chatPreviewsData?: ChatPreviewDefault[]
};

export class ChatPreview extends Block<ChatPreviewProps> {
    chatPreviewsData;

    constructor() {
        super();
        Store.on(StoreEvents.Updated, this.handleStoreUpdate.bind(this));
        this.chatPreviewsData = [];
    }

    handleStoreUpdate() {
        const state = Store.getState();

        if (state.chatPreviews.length !== this.chatPreviewsData.length) {
            this.chatPreviewsData = state.chatPreviews;
            this.setProps({ chatPreviewsData: this.chatPreviewsData });
        }
        //console.log(state.openedChat, this.openedChat);
        
        this.setProps({openedChat: state.openedChat})
    }

    render() {
         return this.compile(template, {
            ...this.props,
            moment,
            resourcesUrl: RESOURCES_URL
        });
    }
}
