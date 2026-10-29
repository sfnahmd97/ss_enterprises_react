import { create } from "zustand";
import api from "../lib/axios";

interface AuthState {
  user: any | null;
  token: string | null;
  loginError: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => {
  const savedToken = localStorage.getItem("auth_token");
  const savedUser = localStorage.getItem("auth_user");

  return {
    user: savedUser ? JSON.parse(savedUser) : null,
    token: savedToken,
    loginError: null,

    isAuthenticated: () => {
      const state = get();
      return !!state.token && !!state.user;
    },

    login: async (email, password) => {
      try {
        set({ loginError: null });
        const res = await api.post("/login", { email, password });
        const data = res.data as any;

        if (!data || typeof data !== "object" || !data.response) {
          console.error("Unexpected response from API:", res.data);
          const msg =
            typeof res.data === "string" && (res.data as string).includes("<!doctype html>")
              ? "Static server error: /api was not forwarded to the backend. Please check server configuration."
              : "Invalid response format from server.";
          set({ loginError: msg });
          return false;
        }

        const { user, token } = data.response;
        const plainToken = token?.plainTextToken;

        if (!plainToken) {
          set({ loginError: "Token missing from server response." });
          return false;
        }

        set({ token: plainToken, user, loginError: null });

        localStorage.setItem("auth_token", plainToken);
        localStorage.setItem("auth_user", JSON.stringify(user));

        return true;
      } catch (error: any) {
        console.error("Login failed", error);
        let message = "Invalid credentials, please try again.";
        if (error.response?.data?.message) {
          message = error.response.data.message;
        } else if (error.response?.data?.errors) {
          const firstKey = Object.keys(error.response.data.errors)[0];
          message = error.response.data.errors[firstKey][0] || message;
        } else if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
          message = "Network / CORS error: The API server blocked the connection or is unreachable.";
        }
        set({ loginError: message });
        return false;
      }
    },

    logout: () => {
      set({ token: null, user: null, loginError: null });
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    },
  };
});
