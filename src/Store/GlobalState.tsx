import { create } from "zustand";
import type { LoginType } from "../Models/Login";
import { loginUser, logoutUser } from "../Services/AuthService";
import type { LoginResponseDataType } from "../Models/LoginResponseData";
import { persist } from "zustand/middleware";
import type { Role } from "../Models/Role";
import toast from "react-hot-toast";

// Function to validate whether role in the db is mathing with valid roles or not before logging in the user
const isValidRole = (role: Role) => {
  return role === "ROLE_Admin" || role === "ROLE_User";
};

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
    setUserLoggedInDetailsForRefresh: (userEmail: string, role: Role) => void;
}

// Main logic for global state
const useAuth = create<AuthState>()(persist((set, get)=>({
    userEmail: null,
    role: null,
    token: null,
    isLoggedIn: false,
    login: async (loginData)=>{
        const res = await loginUser(loginData);
        if (!res.role || !isValidRole(res.role as Role)) {
            get().logout();
            throw new Error("You are not authorized to access! Role is invalid");
        }
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
    setUserLoggedInDetailsForRefresh: (userEmail, role) =>{
        if (!isValidRole(role)) {
            toast.error("You are not authorized to access! Role is invalid");
            get().logout();
            return;
        }
        set({userEmail, role, isLoggedIn: true})
    },
}), {name: 'auth-key'}));

export default useAuth;