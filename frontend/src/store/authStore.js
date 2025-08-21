import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("userInfo")) || null, // load from local storage

  login: (userData) => {
    localStorage.setItem("userInfo", JSON.stringify(userData));
    set({ user: userData });
  },

  logout: () => {
    localStorage.removeItem("userInfo");
    set({ user: null });
  },
}));
