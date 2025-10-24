import axios from "axios";

const api = axios.create({
  baseURL: "/api", 
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");

    config.headers = config.headers ?? {};

    if (token) {
      (config.headers as any).Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    
    console.error(" API Error:", error.response?.status, error.response?.data); // debug
    if ([401, 403, 419, 500].includes(error.response?.status)) {
  localStorage.removeItem("auth_token"); 
  window.location.href = "/login";
}
    return Promise.reject(error);
  }
);


export default api;