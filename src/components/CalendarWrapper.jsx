import React from "react";
import { Calendar } from "./Calendar";
import { TimeSelector } from "./TimeSelector";

export const CalendarWrapper = ({
  monthIndex,
  year,
  setMonthIndex,
  setYear,
  handleModalOpen,
  tasksState,
  setIsCalendarVisible,
  isCalendarVisible,
  isMobile,
}) => {
  return (
    <>
      {isCalendarVisible && isMobile && (
        <>
          <TimeSelector
            monthIndex={monthIndex}
            year={year}
            setMonthIndex={setMonthIndex}
            setYear={setYear}
          />
          <Calendar
            monthIndex={monthIndex}
            year={year}
            handleModalOpen={handleModalOpen}
            tasksState={tasksState}
            isMobile={isMobile}
          />
        </>
      )}
      {!isMobile && (
        <Calendar
          monthIndex={monthIndex}
          year={year}
          handleModalOpen={handleModalOpen}
          tasksState={tasksState}
          isMobile={isMobile}
        />
      )}
      {isMobile && (
        <div className="flex justify-center items-center">
          <button
            onClick={() => {
              setIsCalendarVisible((isCalendarVisible) => !isCalendarVisible);
            }}
            className="border p-2 bg-slate-200"
          >
            {isCalendarVisible ? "Hide Calendar" : "Show Calendar"}
          </button>
        </div>
      )}
    </>
  );
};
