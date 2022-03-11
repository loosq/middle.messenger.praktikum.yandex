import Block from "../../utils/Block";
import template from "./inputGroup.pug"
import "./inputGroup.css"
import {Input} from "./fragments/input/Input";
import {Error} from "./fragments/error/Error";
import validate from "../../utils/validation";

interface InputGroupProps {
    name: string,
    label: string,
    errorMessage?: string,
    validateAs?: string,
    setValidationStatus?: (arg1:string, arg2:boolean) => void,
    children?: any[]
}

export class InputGroup extends Block<InputGroupProps> {
    isValid;

    validationHandler = (value) => {
        if (!value) return;

        const {setValidationStatus, validateAs, name} = this.props;
        const isValid = !!validate(validateAs, value);
        this.isValid = isValid;
        this.children.error.setProps({isValid});

        if (setValidationStatus) {
            setValidationStatus(name, isValid)
        }
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
        //console.log(this.props)
        return this.compile(template, {...this.props});
    }
}
