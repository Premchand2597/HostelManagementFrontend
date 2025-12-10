import React, { useEffect, useState } from "react";
import AdminDashboard from "./component/AdminDashboard";
import UserDashboard from "./component/UserDashboard";
import Login from "./component/Login";


function App() {

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on refresh
  useEffect(() => {
    fetch("http://localhost:8090/api/auth/me", {
      method: "GET",
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then(data => {
        setRole(data.role);     // Restore user role
        setLoading(false);
      })
      .catch(() => {
        setRole(null);
        setLoading(false);
      });
  }, []);

  if (loading) return <h3>Loading...</h3>;

  if (!role) return <Login setRole={setRole} />;

  if (role === "ROLE_Admin") return <AdminDashboard setRole={setRole} />;

  if (role === "ROLE_User") return <UserDashboard setRole={setRole} />;

  return <h3>Unauthorized</h3>;
}

export default App;
