import { create } from "zustand";
import api from "../lib/axios";

interface AuthState {
  user: any | null;
  token: string | null;
  login: (email: string, password: string,) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => {
  const savedToken = localStorage.getItem("auth_token");
  const savedUser = localStorage.getItem("auth_user");

  return {
    user: savedUser ? JSON.parse(savedUser) : null,
    token: savedToken,

    isAuthenticated: () => {
      const state = get();
      return !!state.token && !!state.user;
    },

    login: async (email, password, ) => {
      try {
        const res = await api.post("/login", { email, password });

        const { user, token } = (res.data as { response: { user: any; token: any } }).response;
        const plainToken = token.plainTextToken;

        set({ token: plainToken, user });

          localStorage.setItem("auth_token", plainToken);
          localStorage.setItem("auth_user", JSON.stringify(user));

        return true;
      } catch (error) {
        console.error("Login failed", error);
        return false;
      }
    },

    logout: () => {
      set({ token: null, user: null });
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    },
  };
});
