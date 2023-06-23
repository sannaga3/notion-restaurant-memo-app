import { FC } from "react";
import sortStore from "@/store/sortStore";

type Props = {
  selectedColumn: string;
};

const SortIcon: FC<Props> = ({ selectedColumn }) => {
  const { columnName, direction } = sortStore();
  return (
    <span className="inline-block ml-1">
      {selectedColumn === columnName && (
        <>{direction === "asc" ? <>↑</> : <>↓</>}</>
      )}
    </span>
  );
};

export default SortIcon;
