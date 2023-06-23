import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type SortStore = {
  columnName: string;
  direction: string;
  setSort: (columnName: string, direction: string) => void;
};

const labelStore = create<SortStore>()(
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
    }),
    {
      name: "sort-store-storage",
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    }
  )
);

export default labelStore;
