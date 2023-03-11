import dayjs from "dayjs";
import { useCallback, useReducer, useState } from "react";
import { Header, Tasks, CalendarWrapper, TaskModal } from "./components";
import { tasksReducer } from "./reducers/tasksReducer";
import { useWindowSize } from './hooks/hooks';

function App() {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [year, setYear] = useState(dayjs().year());
  const existingState = JSON.parse(localStorage.getItem("tasks")) ?? {};
  const [tasksState, tasksDispatch] = useReducer(tasksReducer, existingState);
  const [windowWidth] = useWindowSize();
  const isMobile = windowWidth < 500;
  const [isCalendarVisible, setIsCalendarVisible] = useState(isMobile ? false : true);
  // Modal States
  const [modalIsOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState({
    title: "",
    date: "",
  });
  const handleModalOpen = useCallback(
    (year, month, date) => {
      if (year) {
        const taskTitle = tasksState[`${year}-${month + 1}-${date}`];
        setModalState({
          title: taskTitle ? taskTitle : "",
          date: `${year}-${month + 1}-${date}`,
        });
      }
      setIsModalOpen(true);
    },
    [tasksState]
  );
  const handleModalClose = useCallback(() => {
    setModalState({
      title: "",
      date: "",
    });
    setIsModalOpen(false);
  }, []);

  return (
    <div className="w-full">
      <Header
        handleModalOpen={handleModalOpen}
        monthIndex={monthIndex}
        year={year}
        setMonthIndex={setMonthIndex}
        setYear={setYear}
        isMobile={isMobile}
      ></Header>
      <main className="flex flex-col md:flex-row">
        <CalendarWrapper
          monthIndex={monthIndex}
          year={year}
          setMonthIndex={setMonthIndex}
          setYear={setYear}
          handleModalOpen={handleModalOpen}
          tasksState={tasksState}
          setIsCalendarVisible={setIsCalendarVisible}
          isCalendarVisible={isCalendarVisible}
          isMobile={isMobile}
        />
        <Tasks
          tasksState={tasksState}
          tasksDispatch={tasksDispatch}
          year={year}
          monthIndex={monthIndex}
        />
      </main>
      <TaskModal
        modalIsOpen={modalIsOpen}
        setIsModalOpen={setIsModalOpen}
        modalState={modalState}
        setModalState={setModalState}
        handleModalClose={handleModalClose}
        tasksDispatch={tasksDispatch}
      />
    </div>
  );
}

export default App;
