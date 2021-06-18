import React, { useState, useEffect } from 'react';
import Timeline from '../Components/Timeline';
import ReservationForm from '../Components/ReservationForm';
import Navigation from '../Components/Navigation';
import { jsonToArray, range } from '../utils/utils';
import Modal from '../Components/Modal/Modal';

const Reservation = () => {
  const now = new Date();
  const [reservationDatas, setReservationDatas] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    now.toISOString().substring(0, 10)
  );
  const [selectedRoom, setSelectedRoom] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [reservationTime, setReservationTime] = useState({});
  const meetingRooms = ['1', '2', '3', '4', '5'];

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

  const test = (jsonArray) => {
    let temp = {};
    for (let i = 0; i < meetingRooms.length; i++) {
      temp[meetingRooms[i]] = [];
    }
    for (let i = 0; i < jsonArray.length; i++) {
      const { room_type, start_time, end_time } = jsonArray[i];
      temp[room_type] = temp[room_type].concat(
        range(parseInt(start_time), parseInt(end_time))
      );
    }
    setReservationTime(temp);
  };
  const getReservations = async () => {
    try {
      const response = [
        {
          room_type: '1',
          start_time: '3',
          end_time: '5',
        },
        {
          room_type: '3',
          start_time: '2',
          end_time: '3',
        },
        {
          room_type: '3',
          start_time: '5',
          end_time: '10',
        },
      ];
      // const response = await axios.get('/reservation');
      const jsonArray = jsonToArray(response);
      setReservationDatas(jsonArray);
      test(jsonArray);
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e) => {
    setSelectedDate(e.target.value);
    getReservations();
  };

  useEffect(() => {
    // getReservations();
  });

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
        meetingRooms={meetingRooms}
      />
      {/* <Timeline setRoom={setSelectedRoom} /> */}
      <ReservationForm
        selectedRoom={selectedRoom}
        startTime={startTime}
        setStartTime={setStartTime}
        reservationDatas={reservationDatas}
        memberArray={memberArray}
        setMemberArray={setMemberArray}
        form={form}
        setForm={setForm}
        reservationTime={reservationTime}
      />
      <button onClick={openModal}>모달팝업</button>
      <Modal
        open={modalOpen}
        close={closeModal}
        header="Modal heading"
        selectedDate={selectedDate}
        selectedRoom={selectedRoom}
        startTime={startTime}
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
