import axios from "axios";
import useAuth from "../Store/GlobalState";
import { generateNewAccessToken } from "../Services/AuthService";

const apiClient = axios.create({
    baseURL: "http://localhost:8090/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

export const apiPublic = axios.create({
  baseURL: "http://localhost:8090/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" }
});

// Add access token on every request as Bearer in request header
apiClient.interceptors.request.use(config=>{
    const accessToken = useAuth.getState().token;
    if(accessToken){
        config.headers.Authorization=`Bearer ${accessToken}`;
    }
    return config;
});

let isRefreshing = false;
let refreshQueue = [];

// response interceptor to generate new access token based on 401 error (Unauthorized access)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as any;

    // Do NOT refresh for these endpoints
    if (
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    // Not a 401 OR already retried
    if (
      !error.response ||
      error.response.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise(resolve => {
        refreshQueue.push(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(apiClient(originalRequest));
        });
      });
    }

    isRefreshing = true;

    try {
      // Call refresh endpoint
      const { accessToken } = await generateNewAccessToken();

      // Update Zustand
      useAuth.getState().setNewAccessToken(accessToken);

      refreshQueue.forEach(cb => cb(accessToken));
      refreshQueue = [];
      isRefreshing = false;

      // Retry original request
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;

      return apiClient(originalRequest);

    } catch (refreshError) {
      refreshQueue = [];
      isRefreshing = false;
      // Refresh token invalid → force logout
      useAuth.getState().logout();
      return Promise.reject(refreshError);
    }
  }
);

// or

// let isRefreshing = false;
// let pending: any[] = [];

// function queueRequest(cb: any) {
//   pending.push(cb);
// }

// function resolveQueue(newToken: string) {
//   pending.forEach((cb) => cb(newToken));
//   pending = [];
// }

// // response interceptors
// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {

//     const is401 = error.response.status === 401;
//     const original = error.config;

//     // Do NOT refresh for these endpoints
//     if (
//       original.url?.includes("/auth/login") ||
//       original.url?.includes("/auth/refresh")
//     ) {
//       return Promise.reject(error);
//     }

//     if (!is401 || original._retry) {
//       //message:
//       return Promise.reject(error);
//     }

//     original._retry = true;
//     //we will try to refresh the token:
//     if (isRefreshing) {
//       return new Promise((resolve, reject) => {
//         queueRequest((newToken: string) => {
//           if (!newToken) return reject();
//           original.headers.Authorization = `Bearer ${newToken}`;
//           resolve(apiClient(original));
//         });
//       });
//     }

//     //start refresh
//     isRefreshing = true;

//     try {
//       console.log("start refreshing...");
//       const loginResponse = await generateNewAccessToken();
//       const newToken = loginResponse.accessToken;
//       if (!newToken) throw new Error("no access token received");
//       useAuth
//         .getState()
//         .setNewAccessToken(
//           loginResponse.accessToken
//         );

//         useAuth
//         .getState()
//         .setUserLoggedInDetailsForRefresh(
//           loginResponse.email, loginResponse.role
//         );

//       resolveQueue(newToken);
//       original.headers.Authorization = `Bearer ${newToken}`;
//       return apiClient(original);
//     } catch (error) {
//       resolveQueue("null");
//       useAuth.getState().logout();
//       return Promise.reject(error);
//     } finally {
//       isRefreshing = false;
//     }
//   }
// );

export default apiClient;
