import React, { useCallback } from "react";
import daysjs from "dayjs";

export const Calendar = ({ monthIndex, year, handleModalOpen, tasksState, isMobile }) => {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthStartDate = 1;
  const monthEndDate = daysjs().year(year).month(monthIndex).daysInMonth();
  const startDateIndex = daysjs()
    .year(year)
    .month(monthIndex)
    .startOf("month")
    .day();
  const daysList = [];
  for (let day = monthStartDate; day <= monthEndDate; day++) {
    daysList.push(day);
  }
  const emptyCells = [];
  for (let count = 0; count < startDateIndex; count++) {
    emptyCells.push(count);
  }
  const isCellDisabled = useCallback((year, month, day) => {
    const currYear = daysjs().year();
    const currMonth = daysjs().month();
    const currDay = daysjs().date();
    if (year < currYear) {
      return true;
    } else if (month < currMonth) {
      return true;
    } else if (month === currMonth && day < currDay) {
      return true;
    }
  }, []);
  return (
    <div className="w-full md:w-9/12 border grid grid-cols-7">
      {dayNames.map((day) => {
        return (
          <div key={day} className="flex justify-center items-center border">
            {isMobile ? day.substring(0, 3) : day}
          </div>
        );
      })}
      {emptyCells.map((_,idx) => {
        return <div key={idx}></div>;
      })}
      {daysList.map((day) => {
        const isTaskPresent = tasksState[`${year}-${monthIndex+1}-${day}`];
        return (
          <button
            key={day}
            className={`flex justify-center items-center border disabled:opacity-30 p-4`}
            disabled={isCellDisabled(year, monthIndex, day)}
            onClick={(e) => {
              handleModalOpen(year, monthIndex, day);
            }}
          >
            <span className={`flex justify-center items-center w-8 h-8 ${isTaskPresent ? 'rounded-2xl bg-green-500' : null}`}>{day}</span>
          </button>
        );
      })}
    </div>
  );
};
