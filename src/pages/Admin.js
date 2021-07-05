import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation';
import { Button } from 'react-bootstrap';
import '../styles/Admin.css';
import axios from 'axios';
import { getHeaders, setToken } from '../utils/utils';

const Admin = () => {
  const buttonColor = {
    waitlist: 'secondary',
    past: 'secondary',
    present: 'secondary',
    future: 'secondary',
  };

  const [myReservations, setMyReservations] = useState(null);
  const [clickedButton, setClickedButton] = useState('future');
  const [colorForm, setColorForm] = useState({
    ...buttonColor,
    [clickedButton]: 'dark',
  });

  const getReservations = async () => {
    try {
      axios({
        url: 'http://42meet.kro.kr:9100/admin/',
        method: 'GET',
        headers: getHeaders(),
      }).then((response) => {
        setMyReservations(response.data);
        setToken(response);
        console.log(response.data);
      });
      //   setValidate(false);
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
    if (id === 'waitlist') {
      console.log('waitlist');
    } else if (id === 'past') {
      console.log('past');
    } else if (id === 'present') {
      console.log('present');
    } else {
      console.log('future');
    }
  };

  useEffect(() => {
    if (myReservations === null) {
      getReservations();
    }
  }, [myReservations]);

  return (
    <div className="main">
      <div
        style={{
          display: 'flex',
          margin: '10px 10px 10px 10px',
          justifyContent: 'space-around',
        }}
      >
        <Button
          id="waitlist"
          variant={colorForm.waitlist}
          style={{ width: '115px' }}
          onClick={handleList}
        >
          대기중인 예약
        </Button>
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
      <div className="reservationList">
        <div className="title">
          <div className="title__in">
            <div className="title__props">index</div>
          </div>
          <div className="title__in">
            <div className="title__props">date</div>
          </div>
          <div className="title__in">
            <div className="title__props">time</div>
          </div>
          <div className="title__in">
            <div className="title__props">room</div>
          </div>
          {/* <div className="title__in">
            <div className="title__props">leader</div>
          </div>
          <div className="title__in">
            <div className="title__props">number</div>
          </div> */}
          <div className="title__in">
            <div className="title__props">detail</div>
          </div>
          <div className="title__in">
            <div className="title__props">checkbox</div>
          </div>
        </div>
        <div>list</div>
      </div>
      <div className="pageButton"></div>
    </div>
  );
};

export default Admin;
