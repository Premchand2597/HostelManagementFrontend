import { Navigate, Outlet } from "react-router";
import useAuth from "../Store/GlobalState";

const AdminLayout = () => {
  return (
    <div>
      {/* <h1>Admin Layout</h1> */}
      <Outlet />
    </div>
  )
};

export default AdminLayout;