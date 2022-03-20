import Router from "./Router";

export default function withRouter(Component) {

    return class WithRouter extends Component {
        constructor(props) {
            super({...props, $router: Router, name: Component.name});
        }
    }
}
