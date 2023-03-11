import React, { useCallback } from "react";
import {IoChevronBack, IoChevronForward} from 'react-icons/io5';
import Select from 'react-select';

export const TimeSelector = ({ monthIndex, year, setMonthIndex, setYear }) => {
  const START_YEAR = 2020;
  const END_YEAR = 2030;
  const monthsList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const yearsList = [];
  for (let year=START_YEAR; year<=END_YEAR; year++) {
    yearsList.push({value: year, label: year});
  }
  const handleYearChange = useCallback((e) => {
    setYear(Number(e.value));
  }, [setYear]);

  const handleLeftBtnClick = useCallback(() => {
    const newMonthIndex = monthIndex-1;
      if (newMonthIndex < 0) {
        setYear(year-1);
        setMonthIndex(11);
      } else {
        setMonthIndex(newMonthIndex);
      }
  },[monthIndex, setMonthIndex, setYear, year]);

  const handleRightBtnClick = useCallback(() => {
    const newMonthIndex = monthIndex+1;
      if (newMonthIndex > 11) {
        setYear(year+1);
        setMonthIndex(0);
      } else {
        setMonthIndex(newMonthIndex);
      }
  }, [monthIndex, setMonthIndex, setYear, year]);

  const isLeftBtnDisabled = year === START_YEAR && monthIndex===0;
  const isRightBtnDisabled = year === END_YEAR && monthIndex===11;

  return (
    <div className="flex justify-around items-center gap-4">
      <button className="border border-black bg-white flex justify-center items-center disabled:opacity-50" onClick={handleLeftBtnClick} disabled={isLeftBtnDisabled}><IoChevronBack/></button>
      <div className="flex justify-center items-center gap-0.5">
        <span>{monthsList[monthIndex]}</span>
        <Select 
          value={{value: year, label: year}}
          onChange={handleYearChange}
          options={yearsList}
        />
      </div>
      <button className="border border-black bg-white flex justify-center items-center disabled:opacity-50" disabled={isRightBtnDisabled} onClick={handleRightBtnClick}><IoChevronForward/></button>
    </div>
  );
};
