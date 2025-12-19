import { create } from "zustand";
import type { LoginType } from "../Models/Login";
import { loginUser } from "../Services/AuthService";
import type { LoginResponseDataType } from "../Models/LoginResponseData";

export interface AuthState{
    // state
    userEmail: string | null;
    token: string | null;
    isLoggedIn: boolean;
    // actions
    login: (loginData: LoginType) => Promise<LoginResponseDataType>;
    logout: () => void;
}

// Main logic for global state
const useAuth = create<AuthState>((set, get)=>({
    userEmail: null,
    token: null,
    isLoggedIn: false,
    login: async (loginData)=>{
        const res = await loginUser(loginData);
        // console.log(res);
        set({userEmail: res.email, token: res.accessToken, isLoggedIn: true})
        return res;
    },
    logout: ()=>{},
}));

export default useAuth;