import React, { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import "../Custom_CSS/Style.css";
import toast from "react-hot-toast";
import type { RegisterType } from "../Models/Register";
import { registerUser } from "../Services/AuthService";
import OAuth2Buttons from "./OAuth2Buttons";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterType>({
    name: "",
    email: "",
    password: "",
  });

  const [isBtnClicked, setIsBtnClicked] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(formData.name.trim() === ""){
      toast.error("Please enter name field!");
      return;
    }

    if(formData.email.trim() === ""){
      toast.error("Please enter email field!");
      return;
    }

    if(formData.password.trim() === ""){
      toast.error("Please enter password field!");
      return;
    }

    setIsBtnClicked(true);

    try {
      const result = await registerUser(formData);
      toast.success("Registered successfully!");
      setFormData({
          name: "",
          email: "",
          password: "",
      });
      navigate("/login");
    } catch (error: any) {
    const errorMessage =
      error?.response?.data?.error ||   // backend message
      error?.message ||                   // axios/network error
      "Registration failed!";             // fallback
    toast.error(errorMessage);
    console.error(error);
  }finally{
    setIsBtnClicked(false);
  }
};

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Signup</h2>
        <p className="register-subtitle">
          Hostel Management
        </p>

        <OAuth2Buttons />

        <div className="divider">
          <span>OR</span>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control futuristic-input"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

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
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" disabled={isBtnClicked} className="btn custom-btn w-100">
            {isBtnClicked ? "Please wait..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-3">
          <span className="login-link">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
