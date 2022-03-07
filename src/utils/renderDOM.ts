import Block from "../utils/Block";

export function renderDOM(rootSelector: string, component: Block) {
    const root = document.querySelector(rootSelector);
    if (!root) {
        throw Error('No root is found')
    }

    console.log(`Rendering: ${component?.constructor?.name} component`)
    component.dispatchComponentDidMount();
    root.innerHTML = '';
    root.append(component.getContent()!);
}
