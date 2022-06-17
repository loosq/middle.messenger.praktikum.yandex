import Route from "./Route";

class Router {
    private _history;
    private _routes;
    private _currentRoute;
    private _rootQuery;

    constructor(rootQuery: string = '') {
        this._routes = [];
        this._history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
    }

    public use(pathname, block) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this._routes.push(route);

        return this;
    }

    public start(): void {
        window.onpopstate = event => {
            this._onRoute(event.currentTarget.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    public go(pathname): void {
        this._history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    public back(): void {
        this._history.back()
    }

    public forward(): void {
        this._history.forward()
    }

    private _onRoute(pathname): void {
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

    private getRoute(pathname) {
        return this._routes.find(route => route.match(pathname));
    }
}

export default new Router('#root');
