import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from "../../auth/AuthContext";

const NotLoggedIn = () => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
}

export default NotLoggedIn;
