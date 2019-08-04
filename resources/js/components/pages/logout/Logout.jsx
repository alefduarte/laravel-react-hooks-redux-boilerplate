import { useEffect } from "react";
import { useDispatch } from "react-redux";

function LogoutPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: "LOGOUT_REQUEST" });
    }, []);

    return null;
}

export default LogoutPage;
