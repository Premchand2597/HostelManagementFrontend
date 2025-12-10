import React, { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";

function UserDashboard({setRole}) {

  const [data, setData] = useState("");

  useEffect(() => {

    fetch("http://localhost:8090/api/user/data", {
      method: "GET",
      credentials: "include" // SEND THE COOKIE
    })
      .then(res => {
        if (!res.ok) return res.json().then(err => setData(err.error || "Access Denied"));
        return res.text();
      })
      .then(text => setData(text));

  }, []);

  return (
    <div>
      <h2>User Dashboard</h2>
      <p>{data}</p>
      <LogoutButton setRole={setRole} />
    </div>
  );
}

export default UserDashboard;
