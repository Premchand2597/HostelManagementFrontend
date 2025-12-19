import { Navigate, Outlet } from "react-router";
import useAuth from "../Store/GlobalState";

const UserLayout = () => {
  const isLoggedIn = useAuth((state) => state.checkLogin);

  return isLoggedIn() ? (
    <div>
      <h1>User Layout</h1>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default UserLayout;
