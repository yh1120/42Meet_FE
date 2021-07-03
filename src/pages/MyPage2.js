import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Navigation from '../Components/Navigation';
import ReservationList from '../Components/ReservationList';
import { getHeaders } from '../utils/utils';

const MyPage2 = () => {
  const [clickedButton, setClickedButton] = useState('scheduled');
  const [reservations, setReservations] = useState([]);

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
  };

  const getReservations = async () => {
    try {
      const response = await axios.get(
        `http://42meet.kro.kr/reservation/mypage/${clickedButton}`,
        { headers: getHeaders() }
      );
      console.log(response.data);
      setReservations(reservations);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getReservations();
  }, [clickedButton]);

  return (
    <div>
      <Navigation />
      <div
        style={{
          display: 'flex',
          margin: '10px 10px 10px 10px',
          justifyContent: 'space-around',
        }}
      >
        <Button
          id="progress"
          variant={colorForm.progress}
          style={{ width: '115px' }}
          //   onClick={getReservations}
          onClick={handleClick}
        >
          진행중인 예약
        </Button>
        <Button
          id="scheduled"
          variant={colorForm.scheduled}
          style={{ width: '115px' }}
          //   onClick={getReservations}
          onClick={handleClick}
        >
          다가올 예약
        </Button>
        <Button
          id="expired"
          variant={colorForm.expired}
          style={{ width: '115px' }}
          //   onClick={getReservations}
          onClick={handleClick}
        >
          지난 예약
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      ></div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {Array.from(reservations).map((reservation) => {
          return (
            <div>
              <ReservationList
                reservation={reservation}
                // setValidate={setValidate}
                clickedButton={clickedButton}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyPage2;
