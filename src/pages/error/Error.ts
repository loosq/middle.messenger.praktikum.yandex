import Block, {BlockProps} from "../../utils/block/Block";
import withRouter from "../../utils/withRouter"
import template from "./error.pug"
import errorData from "./mocks/errors"

class Error extends Block<BlockProps> {

    constructor(props) {
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

        const {$router} = this.props;

        if (href && $router) {
            $router.go(href)
        }
    }

    render() {

        return this.compile(template, {
            ...this.props,
            label: errorData[0].label,
            subLabel: errorData[0].subLabel,
            href: errorData[0].href
        });
    }
}

export default withRouter(Error);
