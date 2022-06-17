import {renderDOM} from "../../renderDOM";
import MockBlock from "./mock/block/MockBlock";
let block;
describe("Block", () => {
   beforeAll(() => {
       document.body.innerHTML = '<div id="root"></div>';
       block = new MockBlock();
       renderDOM("#root", block);
   })

    it('should compile and render content',  () => {
        const element = document.getElementById('testId');
        expect(element).toBeTruthy();
    });

    it('should setProps',  () => {
        const title = 'testTitle';
        block.setProps({title});
        const element = document.getElementById('testId');
        expect(element && element.textContent).toBe(title);
        block.render = jest.fn();
    });

    it('should return HTMLElement',  () => {
        expect(block.getContent() instanceof HTMLElement).toBeTruthy();
    });
})