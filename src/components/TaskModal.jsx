import Modal from "react-modal";
import { MdClose } from "react-icons/md";
import { ACTION_TYPES } from "../reducers/tasksReducer";
import { useCallback } from "react";
import dayjs from "dayjs";

Modal.setAppElement("#root");

export const TaskModal = ({
  modalIsOpen,
  setIsModalOpen,
  modalState,
  setModalState,
  handleModalClose,
  tasksDispatch,
}) => {
  const customStyles = {
    content: {
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const onBtnClick = useCallback(() => {
    if(modalState.title && modalState.date) {
      let [year, month, date] = modalState.date.split("-");
      date = Number(date);
      month = Number(month);
      if (dayjs(`${year}-${month}-${date}`).isBefore(dayjs(),'date')) {
        // TODO: Use React-Toastify instead of alert
        alert('Cannot select a date less than today');
        return;
      }
      tasksDispatch({
        type: ACTION_TYPES.ADD_TODO,
        payload: {
          title: modalState.title,
          date: `${year}-${month}-${date}`,
        },
      });
      handleModalClose();
    }
  }, [modalState.title, modalState.date, tasksDispatch, handleModalClose])
  let modalStateDate = "";
  if (modalState.date) {
    let [year, month, date] = modalState.date.split('-');
    modalStateDate = `${year}-${String(month).padStart(2,'0')}-${String(date).padStart(2,'0')}`;
  }
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleModalClose}
      style={customStyles}
    >
      <button className="absolute right-5 top-5" onClick={handleModalClose}>
        <MdClose />
      </button>
      <div className="flex flex-col gap-4">
        <h2>Add Task</h2>
        <input
          type="text"
          className="border p-2"
          value={modalState.title}
          autoFocus
          onChange={(e) => {
            setModalState((modalState) => ({
              ...modalState,
              title: e.target.value,
            }));
          }}
        />
        <input
          type="date"
          className="border p-2"
          value={modalStateDate}
          onChange={(e) => {
            setModalState((modalState) => ({
              ...modalState,
              date: e.target.value, //2023-02-08
            }));
          }}
        />
        <button
          onClick={onBtnClick}
          className="border bg-blue-200"
        >
          Done
        </button>
      </div>
    </Modal>
  );
};
