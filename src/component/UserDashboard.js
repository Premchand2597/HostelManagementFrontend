import React, { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";

function UserDashboard({ setRole }) {
  const [userData, setUserData] = useState("");

  useEffect(() => {
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
      <h2>User Dashboard</h2>
      <p>User Data: {userData}</p>
      <LogoutButton setRole={setRole} />
    </div>
  );
}

export default UserDashboard;
