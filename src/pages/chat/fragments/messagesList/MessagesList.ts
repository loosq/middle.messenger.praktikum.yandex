import Block from "../../../../utils/Block";
import template from "./messagesList.pug"

export class MessagesList extends Block<{}> {
    
    render() {
        return this.compile(template, {...this.props});
    }
}
