import React, { useState } from "react";

function Login({ setRole }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Login call
      const loginRes = await fetch("http://localhost:8090/api/auth/login", {
        method: "POST",
        credentials: "include", // Send session cookie
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!loginRes.ok) {
        const err = await loginRes.json();
        setError(err.error || "Login failed");
        return;
      }

      // 2. Get logged in user's role
      const meRes = await fetch("http://localhost:8090/api/auth/me", {
        method: "GET",
        credentials: "include"
      });

      const data = await meRes.json();

      setRole(data.role);

    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        /><br/>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        /><br/>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
