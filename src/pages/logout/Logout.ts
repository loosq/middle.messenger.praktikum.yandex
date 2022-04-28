import Block from "../../utils/Block";
import UserController from "../../controllers/UserController";
import withRouter from "../../utils/withRouter";
import Router from "../../utils/Router";

class Logout extends Block<{}> {
    constructor() {
        super();
    }
    async componentDidMount(oldProps: {} = {}) {
        try {
            await UserController.logout();
        } catch (e) {
            console.error(e)
        } finally {
            Router.go('/');
        }
    }
}

export default withRouter(Logout);
