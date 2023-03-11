import dayjs from "dayjs";
import React from "react";
import { MdClose } from "react-icons/md";
import { ACTION_TYPES } from "../reducers/tasksReducer";

export const Tasks = ({ tasksState, tasksDispatch, year, monthIndex }) => {
  const tasksKeys = Object.keys(tasksState);
  const filteredTasks = tasksKeys.filter(task => {
    const taskYear = Number(task.split('-')[0]);
    const taskMonth = Number(task.split('-')[1]);
    if(taskYear === year && taskMonth-1 === monthIndex) {
      return true;
    }
    return false;
  });
  const sortedTasks = filteredTasks.sort((a,b) => {
    const date1 = Number(a.split('-')[2]);
    const date2 = Number(b.split('-')[2]);
    return date1-date2;
  })
  return (
    <div className="flex-col items-start justify-center w-full md:w-3/12 border">
      <span>Tasks</span>
      <div>
        {sortedTasks.map((taskKey) => {
          return (
            <div key={taskKey} className="flex flex-row justify-between items-center border p-2">
              <div>
                <div className="text-sm text-slate-500">{dayjs(taskKey).format("D MMM YYYY")}</div>
                <div className="text-sm">{tasksState[taskKey]}</div>
              </div>
              <button onClick={()=>{
                tasksDispatch({
                  type: ACTION_TYPES.REMOVE_TODO,
                  payload: {date: taskKey}
                })
              }}
              className='bg-red-500 p-1 border rounded-2xl'
              ><MdClose/></button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
