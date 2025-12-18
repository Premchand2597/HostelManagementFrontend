import React, { useState } from "react";
import { useNavigate } from "react-router";
import "../Custom_CSS/Style.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setFormData({
    //   ...formData,
    //   [e.target.name]: e.target.value,
    // });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // TODO: API login
  };

  const handleGoogleLogin = () => {
    console.log("Google OAuth Login");
    // window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const handleGithubLogin = () => {
    console.log("GitHub OAuth Login");
    // window.location.href = "http://localhost:8080/oauth2/authorization/github";
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <p className="login-subtitle">
          Hostel Management
        </p>

        {/* OAuth Buttons */}
        <div className="oauth-buttons">
          <button
            className="btn oauth-btn google-btn w-100 mb-2"
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </button>

          <button
            className="btn oauth-btn github-btn w-100"
            onClick={handleGithubLogin}
          >
            Continue with GitHub
          </button>
        </div>

        <div className="divider">
          <span>OR</span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control futuristic-input"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control futuristic-input"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn custom-btn w-100">
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <span className="register-link">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/register")}>Register</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
