import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Timeline from '../Components/Timeline';
import ReservationForm from '../Components/ReservationForm';
import Navigation from '../Components/Navigation';
import {
  range,
  getAFewDaysLater,
  getCookieValue,
  getHeaders,
  setToken,
} from '../utils/utils';
import Modal from '../Components/Modal';
import '../styles/Reservation.css';

const Reservation = ({ history }) => {
  const minDate = getAFewDaysLater(7).toISOString().substring(0, 10);
  const maxDate = getAFewDaysLater(20).toISOString().substring(0, 10);

  const [locations, setLocations] = useState([]);
  const [alreadyReservations, setAlreadyReservations] = useState([]);
  const [reservedTime, setReservedTime] = useState([]);
  const [userInput, setUserInput] = useState({
    date: minDate,
    location: '',
    roomName: '',
    startTime: null,
    endTime: null,
    department: '',
    title: '',
    purpose: '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [memberArray, setMemberArray] = useState([]);

  const initRooms = async () => {
    console.log('hi', getHeaders());
    try {
      const rooms_res = await axios.get(
        // 'http://42meet.kro.kr:9100/rooms'
        'http://42meet.kro.kr/reservation/rooms',
        {
          headers: getHeaders(),
        }
      );
      console.log('rooms_res', rooms_res);

      setLocations(rooms_res.data);
      try {
        const reservation_res = await axios.get(
          `http://42meet.kro.kr/reservation/list?date=${userInput.date}`,
          // `http://42meet.kro.kr/reservation/list?date=${userInput.date}`,
          { headers: getHeaders() }
        );
        setAlreadyReservations(reservation_res.data);
        setToken(reservation_res);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = async (e) => {
    const date = e.target.value;
    try {
      const response = await axios.get(
        `http://42meet.kro.kr/reservation/list?date=${date}`,
        // `http://42meet.kro.kr/reservation/list?date=${date}`,
        { headers: getHeaders() }
      );
      setAlreadyReservations(response.data);
      setUserInput({
        ...userInput,
        date: date,
        location: '',
        roomName: '',
        startTime: null,
        endTime: null,
      });
      setToken(response);
    } catch (err) {
      console.log(err);
    }
  };

  const openModal = () => {
    const { roomName, startTime, endTime, department, title, purpose } =
      userInput;
    if (roomName && startTime && endTime && department && title && purpose)
      setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const getReservedTime = (data) => {
      const temp = {};
      locations.forEach((table) => {
        let obj = {};
        for (let i = 0; i < table.roomName.length; i++) {
          obj[table.roomName[i]] = [];
        }
        for (let i = 0; i < data.length; i++) {
          const { location, roomName, startTime, endTime } = data[i];
          if (table.location === location)
            obj[roomName] = obj[roomName].concat(
              range(
                parseInt(startTime.slice(0, 2)),
                parseInt(endTime.slice(0, 2)) + 1
              )
            );
        }
        temp[table.location] = obj;
      });
      setReservedTime(temp);
    };
    getReservedTime(alreadyReservations);
  }, [locations, alreadyReservations]);

  useEffect(() => {
    let access_token = getCookieValue('access-token');
    let refresh_token = getCookieValue('refresh-token');

    if (access_token && refresh_token) {
      localStorage.setItem('access-token', access_token);
      localStorage.setItem('refresh-token', refresh_token);
      document.cookie = 'access-token=; path=/; max-age=0';
      document.cookie = 'refresh-token=; path=/; max-age=0';
    } else if (
      !localStorage.getItem('access-token') ||
      !localStorage.getItem('refresh-token')
    ) {
      localStorage.clear();
      console.log('cookie access-token:', access_token);
      console.log('cookie refresh-token:', refresh_token);
      console.log(localStorage.getItem('access-token'));
      console.log(localStorage.getItem('refresh-token'));
      history.push('/');
    }
    initRooms();
  }, []);

  return (
    <div>
      <Navigation />
      <div id="reservation-wrapper">
        <div>
          <div id="datepicker-wrapper">
            <input
              type="date"
              onChange={onChange}
              value={userInput.date}
              min={minDate}
              max={maxDate}
            ></input>
          </div>
          {locations.map((location, idx) => {
            return (
              <Timeline
                key={idx}
                userInput={userInput}
                setUserInput={setUserInput}
                location={location.location}
                meetingRooms={location.roomName}
                reservedTime={reservedTime[location.location]}
              />
            );
          })}
        </div>
        <div>
          <ReservationForm
            userInput={userInput}
            setUserInput={setUserInput}
            memberArray={memberArray}
            setMemberArray={setMemberArray}
            reservedTime={reservedTime[userInput.location]}
            openModal={openModal}
          />
        </div>
        <Modal
          open={modalOpen}
          close={closeModal}
          header="예약 신청"
          userInput={userInput}
          members={memberArray}
        ></Modal>
      </div>
    </div>
  );
};

export default withRouter(Reservation);
