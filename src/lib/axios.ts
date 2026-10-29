import axios from "axios";

// In dev mode, use "/api" to route through Vite's dev proxy (server.proxy).
// In build / production, call the API URL directly (e.g. https://api.ssemlp.com/api).
const api = axios.create({
  baseURL: import.meta.env.DEV
    ? "/api"
    : `${import.meta.env.VITE_API_BASE_URL || ""}/api`,
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
    console.error("API Error:", error.response?.status, error.response?.data);
    if ([401, 403, 419].includes(error.response?.status)) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
