import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const IsAdmin = () => {
    const { isLoggedIn, userEmail } = useAuth();
    const isAdmin = isLoggedIn && userEmail && userEmail.startsWith("admin");

    return isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default IsAdmin;
