import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type SortStore = {
  columnName: string;
  direction: string;
  setSort: (columnName: string, direction: string) => void;
  resetSort: () => void;
};

const sortStore = create<SortStore>()(
  persist(
    (set) => ({
      columnName: "id",
      direction: "desc",
      setSort: (columnName: string, direction: string) =>
        set((state) => ({
          ...state,
          columnName: columnName,
          direction: direction,
        })),
      resetSort: () =>
        set((state) => ({
          ...state,
          columnName: "id",
          direction: "desc",
        })),
    }),
    {
      name: "sort-store-storage",
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    }
  )
);

export default sortStore;
