import {renderDOM} from "../renderDOM"
import Block from "../Block"

export default class Route {
    private _pathname: string;
    private _blockClass;
    private _block: Block<{}> | null;
    private _props;

    constructor(pathname: string, view: Block<{}>, props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave(): void {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname): boolean {
        return pathname === this._pathname;
    }

    render(): void {
        if (!this._block) {
            this._block = new this._blockClass(this._props);
        }

        renderDOM(this._props.rootQuery, this._block);
    }
}
