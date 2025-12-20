import { create } from "zustand";
import type { LoginType } from "../Models/Login";
import { loginUser, logoutUser } from "../Services/AuthService";
import type { LoginResponseDataType } from "../Models/LoginResponseData";
import { persist } from "zustand/middleware";
import type { Role } from "../Models/Role";

export interface AuthState{
    // state
    userEmail: string | null;
    role: Role | null;
    token: string | null;
    isLoggedIn: boolean;
    // actions
    login: (loginData: LoginType) => Promise<LoginResponseDataType>;
    logout: () => void;
    checkLogin: ()=> boolean;
    setNewAccessToken: (token: string) => void;
}

// Main logic for global state
const useAuth = create<AuthState>()(persist((set, get)=>({
    userEmail: null,
    role: null,
    token: null,
    isLoggedIn: false,
    login: async (loginData)=>{
        const res = await loginUser(loginData);
        set({userEmail: res.email, role: res.role as Role, token: res.accessToken, isLoggedIn: true})
        return res;
    },
    logout: async ()=>{
        try {
            await logoutUser();
        } catch (error) {
            console.error(error);
        }
        set({userEmail: null, role: null, token: null, isLoggedIn: false})
    },
    checkLogin: ()=>{
        if(get().token && get().isLoggedIn){
            return true;
        }else{
            return false;
        }
    },
    setNewAccessToken: (token)=>{
        set({token});
    },
}), {name: 'auth-key'}));

export default useAuth;