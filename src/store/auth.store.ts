import { create } from "zustand";

interface StoreState {
  isLoogedIn: boolean;
  storeLogin: (token: string) => void;
  storeLogout: () => void;
}

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const useAuthStore = create<StoreState>((set) => ({
  isLoogedIn: getToken() ? true : false, // 초기값
  storeLogin: (token: string) => {
    set({ isLoogedIn: true });
    setToken(token);
  },
  storeLogout: () => {
    set({ isLoogedIn: false });
    removeToken();
  },
}));
