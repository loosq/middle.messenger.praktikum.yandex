import Block, {BlockProps} from "../../../../utils/block/Block";
import template from "./profileError.pug"

interface ProfileErrorProps extends BlockProps {
    label?: string
}

class ProfileError extends Block<ProfileErrorProps> {

    render() {
        return this.compile(template, {...this.props});
    }
}

export default ProfileError;
