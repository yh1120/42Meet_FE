import React, { useState } from "react";
import Timeline from "../Components/Timeline";
import ReservationForm from "../Components/ReservationForm";
import Navigation from "../Components/Navigation";
import Modal from "../Components/Modal";
import ModalInput from "../Components/ModalInput";

const Reservation = () => {
  const now = new Date();
  const [selectedRoom, setSelectedRoom] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState(
    now.toISOString().substring(0, 10)
  );
  const minDate = new Date(now.setDate(now.getDate() + 7))
    .toISOString()
    .substring(0, 10);
  const maxDate = new Date(now.setDate(now.getDate() + 14))
    .toISOString()
    .substring(0, 10);

  const onChange = (e) => {
    setSelectedDate(e.target.value);
    //axios
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Navigation />
      <input
        type="date"
        id="start"
        name="Reservation"
        onChange={onChange}
        value={selectedDate}
        min={minDate}
        max={maxDate}
      ></input>
      <Timeline setRoom={setSelectedRoom} />
      <Timeline setRoom={setSelectedRoom} />
      <ReservationForm selectedRoom={selectedRoom} />
      <button onClick={openModal}>모달팝업</button>
      <Modal open={modalOpen} close={closeModal} header="Modal heading">
        <ModalInput />
      </Modal>
    </div>
  );
};

export default Reservation;
