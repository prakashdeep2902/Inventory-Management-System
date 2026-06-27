import { STORAGE_KEYS } from "@/constants/storage";

export const storage = {
  getToken: () => {
    if (typeof window === "undefined") return null;

    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  setToken: (token: string) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  },

  removeToken: () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  },

  getUser: () => {
    if (typeof window === "undefined") return null;

    const user = localStorage.getItem(STORAGE_KEYS.USER);

    return user ? JSON.parse(user) : null;
  },

  setUser: (user: unknown) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  clear: () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },
};
