import Block, {BlockProps} from "../../../../utils/Block";
import template from "./avatar.pug";
import Store, {StoreEvents} from "../../../../utils/Store";

const {Constants: {RESOURCES_URL}} = require('../../../../constants');

interface AvatarProps extends BlockProps {
    avatar: string,
    resourceUrl: string
}

export default class Avatar extends Block<AvatarProps> {
    constructor(props = {}) {
        super({
            ...props,
            resourceUrl: RESOURCES_URL,
            avatar: Store.getState().user.avatar
        });

        Store.on(StoreEvents.updated, this.handleChangeState.bind(this));
    }

    handleChangeState = () => {
        const avatar = Store.getState().user.avatar;

        if (avatar) {
            this.setProps({avatar})
        }
    };

    render() {
        return this.compile(template, {...this.props});
    }
}
