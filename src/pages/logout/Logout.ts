import Block from "../../utils/Block";
import UserController from "../../controllers/UserController";
import withRouter from "../../utils/withRouter";
import Router from "../../utils/router/Router";
import Store from "../../utils/store/Store";

class Logout extends Block<{}> {
    constructor() {
        super();
    }
    async componentDidMount(oldProps: {} = {}) {
        try {
            await UserController.logout();
            Store.restState();
        } catch (e) {
            console.error(e)
        } finally {
            Router.go('/');
        }
    }
}

export default withRouter(Logout);
