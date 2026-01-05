import apiClient, { apiPublic } from "../Config/ApiClient"
import type { LoginType } from "../Models/Login";
import type { LoginResponseDataType } from "../Models/LoginResponseData";
import type { RegisterType } from "../Models/Register"

// Register
export const registerUser = async (data: RegisterType) =>{
    const res = await apiPublic.post(`/auth/register`, data);
    return res.data;
}

// Login
export const loginUser = async (data: LoginType) =>{
    const res = await apiPublic.post<LoginResponseDataType>(`/auth/login`, data);
    return res.data;
}

// Logout
export const logoutUser = async () =>{
    const res = await apiPublic.post(`/auth/logout`);
    return res.data; 
}

// call /refresh endpoint to generate new access token
export const generateNewAccessToken = async () =>{
    const res = await apiPublic.post(`/auth/refresh`);
    return res.data;
}

// Fetch user data
export const fetchUserData = async () =>{
    const res = await apiClient.get(`/user/data`);
    return res.data;
}

// Fetch admin data
export const fetchAdminData = async () =>{
    const res = await apiClient.get(`/admin/data`);
    return res.data;
}

// To fetch all registered user data
export const fetchAllUsersData = async () =>{
    const res = await apiClient.get(`/admin/fetchAllRegistrationData`);
    return res.data;
}

// To fetch specific data by id
export const fetchDataById = async (id: number) =>{
    const res = await apiClient.get(`/admin/registeredUsers/${id}`);
    return res.data;
}

// to save the edited details
export const updateEditedData = async (data: RegisterType, id: number) =>{
    const res = await apiClient.put(`/admin/updateUserData/${id}`, data);
    return res.data;
}

// to delete specific user by id
export const deleteUserById = async (id: number) =>{
    const res = await apiClient.delete(`/admin/deleteUser/${id}`);
    return res.data;
}
