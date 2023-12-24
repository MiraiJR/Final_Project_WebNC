import { create } from "zustand";

interface GlobalState {
  isLogin: boolean;
  setIsLogin: (data: boolean) => void;
}

export const useGlobalState = create<GlobalState>((set) => ({
  isLogin: false,
  setIsLogin: (data) => set((state) => ({ ...state, isLogin: data })),
}));
