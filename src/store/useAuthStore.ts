import { create } from "zustand";
import { User } from "@/types";
import { logout } from "@/services/auth.service";

interface AuthState {
  user: User;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user: user, isLoading: false }),
  logout: async () => {
    const res = await logout();
    if (res) {
      set({ user: null, isLoading: false });
    }
  },
}));
