import { Label } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type FilterStore = {
  categoryFilters: Label[];
  prefectureFilters: Label[];
  cityFilters: Label[];
  starSiteFilters: Label[];
  setCategoryFilters: (label: Label) => void;
  setPrefectureFilters: (label: Label) => void;
  setCityFilters: (label: Label) => void;
  setStarSiteFilters: (label: Label) => void;
  removeCategoryFilters: (labelName: string) => void;
  removePrefectureFilters: (labelName: string) => void;
  removeCityFilters: (labelName: string) => void;
  removeStarSiteFilters: (labelName: string) => void;
};

const filterStore = create<FilterStore>()(
  persist(
    (set, get) => ({
      categoryFilters: [],
      prefectureFilters: [],
      cityFilters: [],
      starSiteFilters: [],
      setCategoryFilters: (newFilter: Label) =>
        set((state) => ({
          ...state,
          categoryFilters: [...state.categoryFilters, newFilter],
        })),
      setPrefectureFilters: (newFilter: Label) =>
        set((state) => ({
          ...state,
          prefectureFilters: [...state.prefectureFilters, newFilter],
        })),
      setCityFilters: (newFilter: Label) =>
        set((state) => ({
          ...state,
          cityFilters: [...state.cityFilters, newFilter],
        })),
      setStarSiteFilters: (filter: Label) =>
        set((state) => ({
          ...state,
          starSiteFilters: [...state.starSiteFilters, filter],
        })),
      removeCategoryFilters: (labelName: string) => {
        const filters = get().categoryFilters;
        const removed = filters.filter((filter) => filter.name !== labelName);
        set((state) => ({
          ...state,
          categoryFilters: removed,
        }));
      },
      removePrefectureFilters: (labelName: string) => {
        const filters = get().prefectureFilters;
        const removed = filters.filter((filter) => filter.name !== labelName);
        set((state) => ({
          ...state,
          prefectureFilters: removed,
        }));
      },
      removeCityFilters: (labelName: string) => {
        const filters = get().cityFilters;
        const removed = filters.filter((filter) => filter.name !== labelName);
        set((state) => ({
          ...state,
          cityFilters: removed,
        }));
      },
      removeStarSiteFilters: (labelName: string) => {
        const filters = get().starSiteFilters;
        const removed = filters.filter((filter) => filter.name !== labelName);
        set((state) => ({
          ...state,
          starSiteFilters: removed,
        }));
      },
    }),
    {
      name: "filter-store-storage",
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    }
  )
);

export default filterStore;
