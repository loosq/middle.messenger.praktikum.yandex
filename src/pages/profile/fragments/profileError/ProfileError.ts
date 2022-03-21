import Block from "../../../../utils/Block";
import template from "./profileError.pug"

interface ProfileErrorProps {
    label?: string
}

class ProfileError extends Block<ProfileErrorProps> {

    render() {
        return this.compile(template, {...this.props});
    }
}

export default ProfileError;
