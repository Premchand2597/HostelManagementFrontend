import apiClient from "../Config/ApiClient"
import type { RegisterType } from "../Models/Register"

// Register
export const registerUser = async (data: RegisterType) =>{
    const res = await apiClient.post(`/auth/register`, data);
    return res.data;
}