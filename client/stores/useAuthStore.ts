import { create } from "zustand";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333/api";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to sign in");
      }

      const user = await response.json();
      set({ user, isLoading: false });

      toast.success("Welcome back!", {
        description: `Signed in as ${user.email}`,
      });

      window.location.href = "/garden";
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to sign in";
      set({ error: message, isLoading: false });
      toast.error("Sign in failed", { description: message });
    }
  },

  register: async (name: string, email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to sign up");
      }

      set({ isLoading: false });

      toast.success("Account created!", {
        description: "You can now sign in with your credentials",
      });

      window.location.href = "/signin";
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to sign up";
      set({ error: message, isLoading: false });
      toast.error("Sign up failed", { description: message });
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        credentials: "include",
      });

      if (!response.ok) {
        set({ user: null, isLoading: false });
        return;
      }

      const user = await response.json();
      set({ user, isLoading: false });
    } catch {
      set({ user: null, isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      set({ user: null, isLoading: false });

      toast.success("Logged out", {
        description: "See you next time!",
      });

      window.location.href = "/signin";
    } catch {
      set({ isLoading: false });
      toast.error("Logout failed", {
        description: "Please try again",
      });
    }
  },

  clearError: () => set({ error: null }),
}));
