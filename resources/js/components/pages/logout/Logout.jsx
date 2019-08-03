import { useEffect } from "react";
import { withRouter } from "react-router-dom";

function LogoutPage(props) {
    useEffect(() => {
        // this.props.dispatch(actions.authLogout());
        props.history.push("/");
    }, []);

    return null;
}

export default withRouter(LogoutPage);
