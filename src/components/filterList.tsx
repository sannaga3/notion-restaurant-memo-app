import { FC, useState } from "react";
import filterStore from "@/store/filterStore";
import labelStore from "@/store/labelStore";
import FilterAndSelectModal from "./filterAndSelectModal";

const FilterList: FC = () => {
  const [showModalName, setShowModalName] = useState("");
  const { categoryFilters, prefectureFilters, cityFilters, starSiteFilters } =
    filterStore();

  const {
    categoryWithColors,
    prefectureWithColors,
    cityWithColors,
    starSiteWithColors,
  } = labelStore();

  const containerAreaStyle = "w-5/6 flex flex-around space-x-2";
  const filterHeaderStyle =
    "w-1/4 text-center text-white bg-indigo-800 rounded-t-lg";
  const filterListStyle = "w-1/4 flex justify-center";

  return (
    <div className="container">
      <div className="w-full flex flex-col justify-center items-center text-sm mt-3">
        <div className={containerAreaStyle}>
          <div className="w-1/6 text-center">
            <div className="font-semibold">フィルター：</div>
          </div>
          <div
            className={filterHeaderStyle}
            onMouseEnter={() => setShowModalName("category")}
          >
            カテゴリ
          </div>
          <div
            className={filterHeaderStyle}
            onMouseEnter={() => setShowModalName("prefecture")}
          >
            県
          </div>
          <div
            className={filterHeaderStyle}
            onMouseEnter={() => setShowModalName("city")}
          >
            地域
          </div>
          <div
            className={filterHeaderStyle}
            onMouseEnter={() => setShowModalName("star_site")}
          >
            サイト名
          </div>
        </div>
        <div className={containerAreaStyle}>
          <div className="w-1/6 text-center" />
          <div className={filterListStyle}>
            {categoryWithColors.length > 0 ? (
              <FilterAndSelectModal
                filters={categoryFilters}
                labelWithColors={categoryWithColors}
                modalName="category"
                showModalName={showModalName}
                setShowModalName={setShowModalName}
              />
            ) : (
              <div className="p-1">選択肢なし</div>
            )}
          </div>
          <div className={filterListStyle}>
            {prefectureWithColors.length > 0 ? (
              <FilterAndSelectModal
                filters={prefectureFilters}
                labelWithColors={prefectureWithColors}
                modalName="prefecture"
                showModalName={showModalName}
                setShowModalName={setShowModalName}
              />
            ) : (
              <div className="p-1">選択肢なし</div>
            )}
          </div>
          <div className={filterListStyle}>
            {cityWithColors.length > 0 ? (
              <FilterAndSelectModal
                filters={cityFilters}
                labelWithColors={cityWithColors}
                modalName="city"
                showModalName={showModalName}
                setShowModalName={setShowModalName}
              />
            ) : (
              <div className="p-1">選択肢なし</div>
            )}
          </div>
          <div className={filterListStyle}>
            {starSiteWithColors.length > 0 ? (
              <FilterAndSelectModal
                filters={starSiteFilters}
                labelWithColors={starSiteWithColors}
                modalName="star_site"
                showModalName={showModalName}
                setShowModalName={setShowModalName}
              />
            ) : (
              <div className="p-1">選択肢なし</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterList;
