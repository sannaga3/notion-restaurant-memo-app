import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Label } from "../types/index";

type LabelStore = {
  categoryWithColors: Label[];
  prefectureWithColors: Label[];
  cityWithColors: Label[];
  starSiteWithColors: Label[];
  setCategoryWithColors: (categoryWithColors: Label[]) => void;
  setPrefectureWithColors: (prefectureWithColors: Label[]) => void;
  setCityWithColors: (cityWithColors: Label[]) => void;
  setStarSiteWithColors: (starSiteWithColors: Label[]) => void;
  resetLabels: () => void;
};

const labelStore = create<LabelStore>()(
  persist(
    (set) => ({
      categoryWithColors: [],
      prefectureWithColors: [],
      cityWithColors: [],
      starSiteWithColors: [],
      setCategoryWithColors: (labels: Label[]) =>
        set((state) => ({
          ...state,
          categoryWithColors: labels,
        })),
      setPrefectureWithColors: (labels: Label[]) =>
        set((state) => ({
          ...state,
          prefectureWithColors: labels,
        })),
      setCityWithColors: (labels: Label[]) =>
        set((state) => ({
          ...state,
          cityWithColors: labels,
        })),
      setStarSiteWithColors: (labels: Label[]) =>
        set((state) => ({
          ...state,
          starSiteWithColors: labels,
        })),
      resetLabels: () =>
        set((state) => ({
          ...state,
          categoryWithColors: [],
          prefectureWithColors: [],
          cityWithColors: [],
          starSiteWithColors: [],
        })),
    }),
    {
      name: "label-store-storage",
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    }
  )
);

export default labelStore;
