import Router from "./Router";

export default function withRouter(Component) {

    return class WithRouter extends Component {
        constructor(props) {
            const router = new Router();

            super({...props, $router: router});
        }
    }
}
