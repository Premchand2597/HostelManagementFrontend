import axios from "axios";
import useAuth from "../Store/GlobalState";
import { applyStyles } from "@popperjs/core";
import { generateNewAccessToken } from "../Services/AuthService";

const apiClient = axios.create({
    baseURL: "http://localhost:8090/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

// Add access token on every request as Bearer in request header
apiClient.interceptors.request.use(config=>{
    const accessToken = useAuth.getState().token;
    if(accessToken){
        config.headers.Authorization=`Bearer ${accessToken}`;
    }
    return config;
});

// response interceptor to generate new access token based on 401 error (Unauthorized access)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If no response or not 401 → throw error and Prevent infinite refresh loop
    if (!error.response || error.response.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // Call refresh endpoint (cookie sent automatically)
      const refreshResponse = await generateNewAccessToken();

      const newAccessToken = refreshResponse.accessToken;

      // Update Zustand store
      useAuth.getState().setNewAccessToken(newAccessToken);

      // Update header and retry original request
      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      return apiClient(originalRequest);

    } catch (refreshError) {
      // Refresh token invalid → logout
      useAuth.getState().logout();
      return Promise.reject(refreshError);
    }
  }
);

export default apiClient;