import Route from "./Route";

class Router {
    routes;
    history;
    private _currentRoute;
    private _rootQuery;
    private static __instance: Router;

    constructor(rootQuery: string = '') {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname, block) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes.push(route);

        return this;
    }

    start(): void {
        window.onpopstate = event => {
            this._onRoute(event.currentTarget.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname): void {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render(route, pathname);
    }

    go(pathname): void {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back(): void {
        this.history.back()
    }

    forward(): void {
        this.history.forward()
    }

    getRoute(pathname) {
        return this.routes.find(route => route.match(pathname));
    }
}

export default new Router('#root')
