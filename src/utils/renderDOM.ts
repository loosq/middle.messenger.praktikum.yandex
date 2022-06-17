import Block, { BlockProps } from "./block/Block";

export function renderDOM(rootSelector: string, component: Block<BlockProps> | null = null) {
    const root = document.querySelector(rootSelector);
    if (!root) {
        throw Error('Root is missing')
    }
    root.innerHTML = '';
    if (component instanceof Block) {
        component.dispatchComponentDidMount();
        root.append(component.getContent()!);
    }
}
