import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation';
import axios from 'axios';
import { getHeaders, setToken } from '../utils/utils';
import { Button } from 'react-bootstrap';
import ReservationList from '../Components/ReservationList';

const MyPage = () => {
  const [myReservations, setMyReservations] = useState(null);
  const [allReservations, setAllReservations] = useState([{}, {}, {}, {}]);
  const [validate, setValidate] = useState(false);
  const [clickedButton, setClickedButton] = useState('future');

  const buttonColor = {
    past: 'secondary',
    present: 'secondary',
    future: 'secondary',
  };
  const [colorForm, setColorForm] = useState({
    ...buttonColor,
    [clickedButton]: 'dark',
  });

  const getReservations = async () => {
    try {
      axios({
        url: 'http://42meet.kro.kr:9100/mypage',
        method: 'GET',
        headers: getHeaders(),
      }).then((response) => {
        setAllReservations(response.data);
        setMyReservations(response.data[1]);
        setToken(response);
        console.log(response.data);
      });
      setValidate(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleList = (e) => {
    const id = e.target.id;
    setClickedButton(id);
    setColorForm({
      ...buttonColor,
      [id]: 'dark',
    });
    if (id === 'past') {
      console.log('past');
      setMyReservations(allReservations[2]);
    } else if (id === 'present') {
      console.log('present');
      setMyReservations(allReservations[0]);
    } else {
      console.log('future');
      setMyReservations(allReservations[1]);
    }
  };

  useEffect(() => {
    if (myReservations === null || validate === true) {
      getReservations();
    }
  }, [myReservations, validate]);

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
          id="present"
          variant={colorForm.present}
          style={{ width: '115px' }}
          onClick={handleList}
        >
          진행중인 예약
        </Button>
        <Button
          id="future"
          variant={colorForm.future}
          style={{ width: '115px' }}
          onClick={handleList}
        >
          다가올 예약
        </Button>
        <Button
          id="past"
          variant={colorForm.past}
          style={{ width: '115px' }}
          onClick={handleList}
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
      >
        {myReservations !== null
          ? Array.from(myReservations).map((reservation) => {
              return (
                <div>
                  <ReservationList
                    reservation={reservation}
                    setValidate={setValidate}
                    clickedButton={clickedButton}
                  />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};
export default MyPage;
