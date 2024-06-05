import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const LoggedIn = () => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default LoggedIn;
