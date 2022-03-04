import Block from "../../utils/Block";
import template from "./inputGroup.pug"
import "./inputGroup.css"
import {Input} from "./fragments/input/Input";
import {Error} from "./fragments/error/Error";

export class InputGroup extends Block {
    isValid;

    validate = (type, string) => {
        console.log({type, string})
        if (!type || !string) return;

        const validationType = {
            name: /^[a-zA-Z\-]+$/,
            email: /^\s^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            string: /^\w[a-zA-Z@#0-9.]*$/,
            phone: /^\s^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        };

        return new RegExp(validationType[type]).test(string);
    }

    validationHandler = (value) => {
        if (!value) return;

        const isValid = this.validate(this.props.validateAs, value);
        this.isValid = isValid;
        this.children.error.setProps({isValid})
    }

    componentDidMount(oldProps: {} = {}) {

        this.children.input = new Input({
            ...this.props,
            value: '',
            events: {
                input: (e) => this.validationHandler(e.target.value),
                focus: (e) => this.validationHandler(e.target.value),
                blur: (e) => this.validationHandler(e.target.value)
            }
        });
        this.children.error = new Error({
            isValid: true,
            errorMessage: this.props.errorMessage
        });
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
