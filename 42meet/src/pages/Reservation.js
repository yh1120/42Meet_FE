import React, { useState, useEffect } from 'react';
import Timeline from '../Components/Timeline';
import ReservationForm from '../Components/ReservationForm';
import Navigation from '../Components/Navigation';
// import axios from 'axios';
import { jsonToArray } from '../utils/utils';
import Modal from '../Components/Modal/Modal';
// import ModalInput from '../Components/Modal/ModalInput';

const Reservation = () => {
  const now = new Date();
  const [reservationDatas, setReservationDatas] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    now.toISOString().substring(0, 10)
  );
  const [selectedTime, setSelectedTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const minDate = new Date(now.setDate(now.getDate() + 7))
    .toISOString()
    .substring(0, 10);
  const maxDate = new Date(now.setDate(now.getDate() + 14))
    .toISOString()
    .substring(0, 10);
  const [memberArray, setMemberArray] = useState([]);
  const [form, setForm] = useState({
    department: '',
    title: '',
    purpose: '',
  });

  const getReservations = async () => {
    try {
      const response = {
        0: {
          room_type: '1층',
          start_time: '3',
          end_time: '5',
        },
        1: {
          room_type: '3층',
          start_time: '2',
          end_time: '10',
        },
      };
      // const response = {
      //   '1층': {
      //     start_time: '3',
      //     end_time: '5'
      //   }
      // };
      // const response = await axios.get('/reservation');
      setReservationDatas(jsonToArray(response));
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e) => {
    setSelectedDate(e.target.value);
    getReservations();
  };

  // useEffect(() => {
  //   getReservations();
  // });

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
      <Timeline
        setRoom={setSelectedRoom}
        reservationDatas={reservationDatas}
        setTime={setSelectedTime}
      />
      {/* <Timeline setRoom={setSelectedRoom} /> */}
      <ReservationForm
        selectedRoom={selectedRoom}
        selectedTime={selectedTime}
        setEndTime={setEndTime}
        reservationDatas={reservationDatas}
        memberArray={memberArray}
        setMemberArray={setMemberArray}
        form={form}
        setForm={setForm}
      />
      <button onClick={openModal}>모달팝업</button>
      <Modal
        open={modalOpen}
        close={closeModal}
        header="Modal heading"
        selectedDate={selectedDate}
        selectedRoom={selectedRoom}
        startTime={selectedTime}
        endTime={endTime}
        department={form.department}
        title={form.title}
        purpose={form.purpose}
        members={memberArray}
      ></Modal>
    </div>
  );
};

export default Reservation;
