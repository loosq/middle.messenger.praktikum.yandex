import Router from "../Router";
import MockBlock from "./mocks/block/MockBlock";

describe("Router", () => {
    it(".use should return router instance" , () => {
        expect(Router.use('/', MockBlock)).toEqual(Router);
    });

    it(".go should render new block" , () => {
        document.body.innerHTML = '<div id="root"></div><div id="modal"></div>';
        Router.use('/testPage', MockBlock);
        Router.go('/testPage');
        const element = document.getElementById('testId');
        expect(element).toBeTruthy();
    });

    it('.forward should be called', () => {
        const forward = jest.fn();
        window.history.forward = forward;
        Router.forward();
        expect(forward).toBeCalledTimes(1);
    })

    it('.back should be called', () => {
        const back = jest.fn();
        window.history.back = back;
        Router.back();
        expect(back).toBeCalledTimes(1);
    })
})
