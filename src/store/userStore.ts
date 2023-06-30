import { User } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UserStore = {
  loginUser: User | null;
  setLoginUser: (loginUser: User) => void;
  resetLoginUser: () => void;
};

const userStore = create<UserStore>()(
  persist(
    (set) => ({
      loginUser: null,
      setLoginUser: (loginUser: User) =>
        set((state) => ({
          ...state,
          loginUser: loginUser,
        })),
      resetLoginUser: () =>
        set((state) => ({
          ...state,
          loginUser: null,
        })),
    }),
    {
      name: "user-store-storage",
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    }
  )
);

export default userStore;
