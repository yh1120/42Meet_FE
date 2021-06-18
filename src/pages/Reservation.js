import React, { useState, useEffect } from 'react';
import Timeline from '../Components/Timeline';
import ReservationForm from '../Components/ReservationForm';
import Navigation from '../Components/Navigation';
import { range } from '../utils/utils';
import Modal from '../Components/Modal/Modal';

const Reservation = () => {
  const now = new Date();
  const rooms = ['1', '2', '3', '4', '5'];

  const [userInput, setUserInput] = useState({
    selectedDate: now.toISOString().substring(0, 10),
    selectedRoom: '',
    startTime: null,
    endTime: null,
    department: '',
    title: '',
    purpose: '',
  });
  const [reservationDatas, setReservationDatas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [reservedTime, setReservedTime] = useState({});
  const [memberArray, setMemberArray] = useState([]);

  const minDate = new Date(now.setDate(now.getDate() + 7))
    .toISOString()
    .substring(0, 10);
  const maxDate = new Date(now.setDate(now.getDate() + 14))
    .toISOString()
    .substring(0, 10);

  const getReservedTime = (jsonArray) => {
    let obj = {};
    for (let i = 0; i < rooms.length; i++) {
      obj[rooms[i]] = [];
    }
    for (let i = 0; i < jsonArray.length; i++) {
      const { room_type, start_time, end_time } = jsonArray[i];
      obj[room_type] = obj[room_type].concat(
        range(parseInt(start_time), parseInt(end_time))
      );
    }
    setReservedTime(obj);
  };

  const getReservedInfo = async () => {
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
      // const jsonArray = jsonToArray(response);
      // setReservationDatas(jsonArray);
      // getReservedTime(jsonArray);
      getReservedTime(response);
      setReservationDatas(response);
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e) => {
    setUserInput({ ...userInput, selectedDate: e.target.value });
    getReservedInfo();
  };

  useEffect(() => {
    if (reservationDatas.length === 0) getReservedInfo();
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const { selectedDate } = userInput;
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
        userInput={userInput}
        setUserInput={setUserInput}
        meetingRooms={rooms}
        reservedTime={reservedTime}
      />
      <ReservationForm
        userInput={userInput}
        setUserInput={setUserInput}
        memberArray={memberArray}
        setMemberArray={setMemberArray}
        reservedTime={reservedTime}
      />
      <button onClick={openModal}>모달팝업</button>
      <Modal
        open={modalOpen}
        close={closeModal}
        header="Modal heading"
        userInput={userInput}
        members={memberArray}
      ></Modal>
    </div>
  );
};

export default Reservation;
