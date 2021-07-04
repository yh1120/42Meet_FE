import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import ReservationList from '../Components/ReservationList';
import { getAllReservations } from '../api/api';

const Admin = () => {
  const [clickedButton, setClickedButton] = useState('scheduled');
  const [reservations, setReservations] = useState([]);
  const [waitReservations, setWaitReservations] = useState([]);

  const buttonColor = {
    progress: 'secondary',
    scheduled: 'secondary',
    expired: 'secondary',
  };

  const [colorForm, setColorForm] = useState({
    ...buttonColor,
    [clickedButton]: 'dark',
  });

  const handleClick = (e) => {
    setClickedButton(e.target.id);
    setColorForm({
      ...buttonColor,
      [e.target.id]: 'dark',
    });
  };

  const getReservations = async () => {
    try {
      const response = await getAllReservations(clickedButton);
      setReservations(response.data.reservationResponseDtos);
      // console.log(response.data.reservationResponseDtos);
      if (clickedButton === 'scheduled') {
        try {
          const response = await getAllReservations('waiting');
          setWaitReservations(response.data.reservationResponseDtos);
          // console.log(response.data.reservationResponseDtos);
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log('Admin - useEffect([clickedButton])');
    getReservations();
  }, [clickedButton]);

  return (
    <div>
      <div id="tag-wrapper">
        <Button
          id="progress"
          variant={colorForm.progress}
          onClick={handleClick}
        >
          진행중인 예약
        </Button>
        <Button
          id="scheduled"
          variant={colorForm.scheduled}
          onClick={handleClick}
        >
          다가올 예약
        </Button>
        <Button id="expired" variant={colorForm.expired} onClick={handleClick}>
          지난 예약
        </Button>
      </div>
      <div className="reservation-lists">
        {Array.from(waitReservations).map((reservation, idx) => {
          return (
            <ReservationList
              key={idx}
              reservation={reservation}
              clickedButton={'waitlist'}
            />
          );
        })}
      </div>
      <div className="reservation-lists">
        {Array.from(reservations).map((reservation, idx) => {
          return (
            <ReservationList
              key={idx}
              reservation={reservation}
              clickedButton={clickedButton}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Admin;
