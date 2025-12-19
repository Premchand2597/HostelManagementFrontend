import apiClient from "../Config/ApiClient"
import type { LoginType } from "../Models/Login";
import type { LoginResponseDataType } from "../Models/LoginResponseData";
import type { RegisterType } from "../Models/Register"

// Register
export const registerUser = async (data: RegisterType) =>{
    const res = await apiClient.post(`/auth/register`, data);
    return res.data;
}

// Login
export const loginUser = async (data: LoginType) =>{
    const res = await apiClient.post<LoginResponseDataType>(`/auth/login`, data);
    return res.data;
}