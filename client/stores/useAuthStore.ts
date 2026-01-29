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
  isInitialized: boolean;
  error: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  checkAuth: () => Promise<void>;
  logout: () => Promise<boolean>;
  clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  isInitialized: false,
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

      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to sign in";
      set({ error: message, isLoading: false });
      toast.error("Sign in failed", { description: message });
      return false;
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

      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to sign up";
      set({ error: message, isLoading: false });
      toast.error("Sign up failed", { description: message });
      return false;
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        credentials: "include",
      });

      if (!response.ok) {
        set({ user: null, isLoading: false, isInitialized: true });
        return;
      }

      const user = await response.json();
      set({ user, isLoading: false, isInitialized: true });
    } catch {
      set({ user: null, isLoading: false, isInitialized: true });
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

      return true;
    } catch {
      set({ isLoading: false });
      toast.error("Logout failed", {
        description: "Please try again",
      });
      return false;
    }
  },

  clearError: () => set({ error: null }),
}));
