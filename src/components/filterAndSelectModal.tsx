import filterStore from "@/store/filterStore";
import { Label } from "@/types";
import { Dispatch, FC, MouseEvent, SetStateAction } from "react";

type Props = {
  filters: Label[];
  labelWithColors: Label[];
  modalName: string;
  showModalName: string;
  setShowModalName: Dispatch<SetStateAction<string>>;
};

const FilterAndSelectModal: FC<Props> = ({
  filters,
  labelWithColors,
  modalName,
  showModalName,
  setShowModalName,
}) => {
  const {
    setCategoryFilters,
    setPrefectureFilters,
    setCityFilters,
    setStarSiteFilters,
    removeCategoryFilters,
    removePrefectureFilters,
    removeCityFilters,
    removeStarSiteFilters,
  } = filterStore();

  const filterNameStyle =
    "flex justify-center items-center text-xs text-white text-center rounded-xl px-1 py-0.5";

  const handleFilter = (
    label: Label,
    labelName: string,
    e: MouseEvent<HTMLButtonElement>
  ) => {
    const target = filters.find(
      ({ name }) => name === e.currentTarget.innerText
    );

    switch (labelName) {
      case "category":
        target ? removeCategoryFilters(label.name) : setCategoryFilters(label);
        break;
      case "prefecture":
        target
          ? removePrefectureFilters(label.name)
          : setPrefectureFilters(label);
        break;
      case "city":
        target ? removeCityFilters(label.name) : setCityFilters(label);
        break;
      case "star_site":
        target ? removeStarSiteFilters(label.name) : setStarSiteFilters(label);
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full relative z-0">
      {showModalName === modalName ? (
        <div
          onMouseLeave={() => setShowModalName("")}
          className="absolute w-full overflow-y-scroll h-20 flex flex-wrap gap-1 border-2 rounded-b-lg bg-slate-600 border-slate-600 p-3 z-50"
        >
          {labelWithColors.map((label) => {
            const changedSelectedColor = filters.some(
              (filter) => filter.name === label.name
            );
            const textStyle = changedSelectedColor
              ? "text-blue-300 font-semibold hover:cursor-pointer"
              : "text-white hover:cursor-pointer";
            return (
              <button
                key={label.name}
                className={textStyle}
                onClick={(e) => handleFilter(label, modalName, e)}
              >
                {label.name}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="w-full h-8 flex flex-wrap overflow-y-scroll space-x-1 text-center border-2 border-slate-600 rounded-b-lg p-0.5">
          {filters.length > 0 ? (
            filters.map((label) => {
              return (
                <div
                  key={label.name}
                  className={filterNameStyle}
                  style={{ backgroundColor: label.color }}
                >
                  <div>{label.name}</div>
                </div>
              );
            })
          ) : (
            <div className="w-full h-8 text-center py-0.5">未選択</div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterAndSelectModal;
