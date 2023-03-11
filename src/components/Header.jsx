import React from "react";
import { TimeSelector } from "./TimeSelector";

export const Header = ({
  handleModalOpen,
  monthIndex,
  year,
  setMonthIndex,
  setYear,
  isMobile,
}) => {
  return (
    <header className="w-full flex justify-between items-center p-4 bg-slate-300">
      <h1 className="text-lg font-medium">To do List</h1>
      {!isMobile && (
        <TimeSelector
          monthIndex={monthIndex}
          year={year}
          setMonthIndex={setMonthIndex}
          setYear={setYear}
        />
      )}
      <button
        className="border p-2 bg-slate-600 text-white"
        onClick={handleModalOpen}
      >
        +Add Task
      </button>
    </header>
  );
};
