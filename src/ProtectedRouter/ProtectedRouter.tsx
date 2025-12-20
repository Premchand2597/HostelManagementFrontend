import toast from 'react-hot-toast';
import useAuth from '../Store/GlobalState';
import { Navigate } from 'react-router';
import type { ProtectedRouteProps } from '../Models/ProtectedRouteProps';

const ProtectedRouter = ({allowedRoles, children}: ProtectedRouteProps) => {
    const {role, token} = useAuth();

    // Not logged in
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    //alert("role = "+role+"  --- allowedRoles = "+allowedRoles);

    // Logged in but role not allowed
    if (!role || !allowedRoles.includes(role)) {
        toast.error("You are not authorized to access!");
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRouter
