import Block from "../../../../Block";
import template from "./template.pug";

export default class MockBlock extends Block {
    render() {
        return this.compile(template);
    }
}
