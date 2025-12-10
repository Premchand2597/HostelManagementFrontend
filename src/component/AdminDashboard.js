import React, { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";

function AdminDashboard({ setRole }) {
  const [adminData, setAdminData] = useState("");
  const [userData, setUserData] = useState("");

  useEffect(() => {
    // Admin data
    fetch("http://localhost:8090/api/admin/data", {
      method: "GET",
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) return res.json().then(err => setAdminData(err.error));
        return res.text();
      })
      .then(text => setAdminData(text));

    // User data
    fetch("http://localhost:8090/api/user/data", {
      method: "GET",
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) return res.json().then(err => setUserData(err.error));
        return res.text();
      })
      .then(text => setUserData(text));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Admin Data: {adminData}</p>
      <p>User Data: {userData}</p>
      <LogoutButton setRole={setRole} />
    </div>
  );
}

export default AdminDashboard;
