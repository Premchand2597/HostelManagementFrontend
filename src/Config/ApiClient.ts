import axios from "axios";
import useAuth from "../Store/GlobalState";

const apiClient = axios.create({
    baseURL: "http://localhost:8090/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

apiClient.interceptors.request.use(config=>{
    const accessToken = useAuth.getState().token;
    if(accessToken){
        config.headers.Authorization=`Bearer ${accessToken}`;
    }
    return config;
});

export default apiClient;