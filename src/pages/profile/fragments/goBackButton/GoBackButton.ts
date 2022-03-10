import Block from "../../../../utils/Block";
import template from "./goBackButton.pug"
import "./goBackButton.css";
import withRouter from "../../../../utils/withRouter";

class GoBackButton extends Block<{}> {
    constructor(props) {
        super(props);
        this.props = {
            ...props,
            events: {
                click: this.handleBackButtonClick
            }
        }
    }

    handleBackButtonClick = () => {
        const {$router} = this.props;

        if ($router) {
            $router.back()
        }
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

export default withRouter(GoBackButton);
