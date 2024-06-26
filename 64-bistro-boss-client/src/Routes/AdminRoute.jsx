import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";


const AdminRoute = ({ children }) => {
    const { user, Loading } = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (Loading || isAdminLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace ></Navigate>
};

export default AdminRoute;