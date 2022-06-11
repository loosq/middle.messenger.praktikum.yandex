import {renderDOM} from "../../../utils/renderDOM";
import Login from "../Login";
import {getByTestId} from '@testing-library/dom';

describe("render login page", () => {
    it(" should be rendered" , () => {
        const component = new Login();
        renderDOM('#modal', component);
        const loginPage = getByTestId(document.body, 'loginPage');
        console.log(loginPage)
    })
})