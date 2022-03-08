import Block from "../utils/Block";

export function renderDOM(rootSelector: string, component: Block<{}> | null) {
    const root = document.querySelector(rootSelector);
    if (!root || !component) {
        throw Error('Root or component is missing')
    }

    console.log(`Rendering: ${component?.constructor?.name} component`)
    component.dispatchComponentDidMount();
    root.innerHTML = '';
    root.append(component.getContent()!);
}
