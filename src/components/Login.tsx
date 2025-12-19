import React, { useState } from "react";
import { useNavigate } from "react-router";
import "../Custom_CSS/Style.css";
import type { LoginType } from "../Models/Login";
import toast from "react-hot-toast";
import { loginUser } from "../Services/AuthService";
import useAuth from "../Store/GlobalState";

const Login = () => {
  const navigate = useNavigate();

  const login = useAuth((state)=>state.login);

  const [formData, setFormData] = useState<LoginType>({
    email: "",
    password: "",
  });

  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(formData.email.trim() === ""){
      toast.error("Please enter email field!");
      return;
    }

    if(formData.password.trim() === ""){
      toast.error("Please enter password field!");
      return;
    }

    setIsButtonClicked(true);

    try {
      const result = await login(formData);
      // console.log(result)
      // const result = await loginUser(formData);
      toast.success("Login successfully!");
      setFormData({
          email: "",
          password: "",
      });
      navigate("/dashboard");
    } catch (error: any) {
    const errorMessage =
      error?.response?.data ||   // backend message
      error?.message ||                   // axios/network error
      "Login failed!";             // fallback
    toast.error(errorMessage);
    console.error(error);
  }finally{
    setIsButtonClicked(false);
  }
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
            />
          </div>

          <button type="submit" disabled={isButtonClicked} className="btn custom-btn w-100">
            {isButtonClicked ? "Please wait..." : "Login"}
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
