import { EventBus } from './EventBus';
import GlobalEventBus from './GlobalEventBus';
import { nanoid } from "nanoid";
import Router from "./Router";
import {log} from "util";

export interface BlockProps {
    classNames?: string[],
    $router?: typeof Router,
    events?: {
        [key: string]: (e: Event) => void
    }
}

export default abstract class Block<TProps extends BlockProps> {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDUM: "flow:component-did-unmount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    public id = nanoid(6);
    private _meta: { props: any };
    protected children: Record<string, any>;
    classNames: string[];
    protected props: TProps;
    private eventBus: () => EventBus;
    private _element: HTMLElement;

    constructor(componentData: object = {}) {
        //console.log('Start rendering ', this.constructor.name)
        const { props, children, classNames } = this._getChildren(componentData);
        const eventBus = new EventBus();
        this.eventBus = () => eventBus;
        this.children = children;
        this.classNames = classNames;
        this._meta = {
            props
        };
        this.props = this._makePropsProxy(props);
        this.initChildren();
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDUM, this.componentDidUnmount.bind(this));
    }

    init() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
    protected initChildren() { }

    emit(event, data = {}) {
        GlobalEventBus.emit(event, data);
    }

    on(event, handler) {
        GlobalEventBus.on(event, handler);
    }

    off(event, handler) {
        GlobalEventBus.off(event, handler);
    }

    componentDidMount(oldProps = {}) {

    }

    private _componentDidMount() {
        //console.log('Rendered', this.constructor.name);
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);

        const childrenArray = Object.values(this.children);
        const childrenIsComponent = childrenArray.every(c => c instanceof Block);

        if (childrenIsComponent) {
            childrenArray.forEach(child => {
                child.dispatchComponentDidMount();
            });
        }
    }

    _getChildren(componentData: any) {
        const children: any = {};
        const props: any = {};
        let classNames: any = [];

        Object.entries(componentData).map(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else if (Array.isArray(value) && value.every(v => v instanceof Block)) {
                children[key] = value;
            } else if (key === 'classNames') {
                classNames = value;
            } else {
                props[key] = value;
            }
        })

        return { props, children, classNames };
    }

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    componentDidUpdate(oldProps, newProps) {
        //TODO добавить глубокое сравнение
        return oldProps !== newProps;
    }

    setProps = nextProps => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    private _removeEvents() {
        const events: Record<string, () => void> = (this.props as any).events;

        if (!events || !this._element) {
            return;
        }

        Object.entries(events).forEach(([event, handler]) => this._element.removeEventListener(event, handler))
    }
    private _addEvents() {
        const events: Record<string, () => void> = (this.props as any).events;

        if (!events || !this._element) {
            return;
        }

        Object.entries(events).forEach(([event, handler]) => {
            this._element.addEventListener(event, handler)
        })
    }

    private _addChildEvents(child) {
        if (!('events' in child.props)) return;

        if (child.props.events) {
            Object.entries(child.props.events).forEach(([event, handler]) => {
                child.getContent().addEventListener(event, handler)
            })
        }
    }

    private _render() {
        const fragment = this.render();
        const newElement = fragment.firstElementChild as HTMLElement || "";

        if (this._element) {
            this._removeEvents();
            this._element.replaceWith(newElement)
        }
        this._element = newElement;

        this._addEvents();
    }

    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    getContent(): HTMLElement | string {
        return this.element;
    }

    private _makePropsProxy(props) {
        const self = this;
        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop, value) {
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            }
        });
    }

    private _createDocumentElement(tagName): HTMLElement {
        return document.createElement(tagName);
    }

    compile(template: (context: any) => string, context: any = {}) {
        const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

        Object.entries(this.children).forEach(([key, child]) => {
            const childrenIsArray = Array.isArray(child) && child.every(v => v instanceof Block);
            if (childrenIsArray) {
                context[key] = child.map(({ id }) => `<div data-id="id-${id}"></div>`);
                return;
            }

            context[key] = `<div data-id="id-${child.id}"></div>`;
        });

        const htmlString = template(context);
        fragment.innerHTML = htmlString;


        Object.entries(this.children).forEach(([key, child]) => {
            const isChildrenArray = Array.isArray(child) && child.every(v => v instanceof Block) as boolean;

            if (isChildrenArray) {
                const childrenIds = child.map(({ id }) => id);
                const stubs = childrenIds.map(id => fragment.content.querySelector(`[data-id="id-${id}"]`)) as [];

                stubs.forEach((stub: HTMLElement) => {
                    const childById = child.find(ch => "id-" + ch.id === stub.dataset.id)
                    stub.replaceWith(childById.getContent());
                    this._addChildEvents(childById);
                });
                return;
            }
            const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);
            if (!stub) {
                return;
            }
            const content = child.getContent()!;
            stub.replaceWith(content);
            this._addChildEvents(child);

            if (stub.childNodes.length) {
                content.append(...stub.childNodes);
            }

            //add classes
            if (Array.isArray(child.classNames) && child.classNames.length) {
                child.getContent().classList.add(...child.classNames);
            }
        });

        return fragment.content;
    }

    protected componentDidUnmount() {}

    hide() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDUM);
        if (this._element) {
            this._element.style.display = 'none';
        }
    }
}
