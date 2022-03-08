import {EventBus} from './EventBus';
import {nanoid} from "nanoid";

export default abstract class Block<TProps> {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    public id = nanoid(6);
    private _meta;
    children: Record<string, any>;
    protected classNames: string[];
    protected props: TProps;
    private eventBus: () => EventBus;
    private _element;

    constructor(componentData: object = {}) {
        const eventBus = new EventBus();
        const {props, children, classNames} = this.getChildren(componentData);
        this.children = children;
        this.classNames = classNames;
        this.initChildren();
        this._meta = {
            props
        };

        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    init() {
        this._addClasses();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }
    protected initChildren() {}

    private _componentDidMount() {
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    componentDidMount(oldProps = {}) {
    }

    getChildren(componentData: any) {
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

        return {props, children, classNames};
    }

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
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
        const newElement = fragment.firstElementChild as HTMLElement;

        if (this._element) {
            this._removeEvents();
            this._element.replaceWith(newElement)
        }
        this._element = newElement;

        this._addEvents()
    }

    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    private _addClasses() {
        // @ts-ignore Возможно добавить в мету
        if (this.props.classList) {
            // @ts-ignore
            this.element.classList = this.props.classList;
        }
    }

    getContent(): HTMLElement | null {
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
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target);
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
                context[key] = child.map(({id}) => `<div data-id="id-${id}"></div>`);
                return;
            }

            context[key] = `<div data-id="id-${child.id}"></div>`;
        });

        const htmlString = template(context)
        fragment.innerHTML = htmlString;

        Object.entries(this.children).forEach(([key, child]) => {
            const isChildrenArray = Array.isArray(child) && child.every(v => v instanceof Block) as boolean;

            if (isChildrenArray) {
                const childrenIds = child.map(({id}) => id);
                const stubs = childrenIds.map(id => fragment.content.querySelector(`[data-id="id-${id}"]`)) as [];
                stubs.forEach((stub: HTMLElement) => {
                    const childById = child.find(ch => "id-"+ch.id === stub.dataset.id)
                    stub.replaceWith(childById.getContent());

                    this._addChildEvents(childById);
                });
                return;
            }
            const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);
            if (!stub) {
                return;
            }

            stub.replaceWith(child.getContent()!);
            this._addChildEvents(child);

            //add classes
            if (Array.isArray(child.classNames) && child.classNames.length) {
                child.getContent()!.classList.add(...child.classNames);
            }
        });

        return fragment.content;
    }

    show() {
        this._element.style.display = 'block';
    }

    hide() {
        this._element.style.display = null;
    }
}
