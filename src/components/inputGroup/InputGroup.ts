import Block, { BlockProps } from "../../utils/Block";
import template from "./inputGroup.pug"
import "./inputGroup.css"
import { Input } from "./../input/Input";
import { Error } from "./fragments/error/Error";
import validate from "../../utils/validation";

export interface InputGroupProps extends BlockProps {
    name: string,
    label?: string,
    errorMessage?: string,
    validateAs?: string,
    value?: string,
    onInputChange?: (status: boolean, name: string) => void
}

export class InputGroup extends Block<InputGroupProps> {
    constructor(props: InputGroupProps) {
        super(props);
    }
    
    initChildren(): void {
        this.children.input = new Input({
            ...this.props,
            events: {
                input: (e: Event & {target: {value: string}}) => this.validationHandler(e.target.value)
            }
        });
        this.children.error = new Error({
            errorMessage: this.props.errorMessage,
            isValid: true
        }); 
    }

    validationHandler = (value) => {
        if (!value) return;

        const {validateAs, onInputChange, name} = this.props;
        const isValid = !!validate(validateAs, value);
        this.children.error.setProps({isValid});
        if (typeof onInputChange === 'function') {
            onInputChange(isValid, name);
        }
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
