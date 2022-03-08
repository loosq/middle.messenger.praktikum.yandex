import Block from "../../../../utils/Block";
import withRouter from "../../../../utils/withRouter";
import template from "./chatOperations.pug"
import "./chatOperations.css";

class ChatOperations extends Block<{}> {
    constructor(props = {}) {
        super(props);
        this.props = {
            ...props,
            events: {
                click: this.handleLinkClick
            }
        }
    }

    handleLinkClick = (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        const {href} = e.target.dataset;
        // @ts-ignore
        const {$router} = this.props;

        if (href && $router) {
            $router.go(href)
        }
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

export default withRouter(ChatOperations);
