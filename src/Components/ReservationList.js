import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { getHeaders, setToken } from '../utils/utils';

const ReservationList = ({ reservation, setValidate }) => {
  const { date, startTime, endTime, roomName, members, leaderName, id } =
    reservation;

  const handleClick = (e) => {
    const i = parseInt(e.target.id);
    axios({
      url: 'http://42meet.kro.kr/reservation/delete',
      method: 'POST',
      headers: getHeaders(),
      data: {
        id: i,
      },
    }).then((response) => {
      console.log('응답', response);
      if (response.status === 200) {
        setValidate(true);
      }
      setToken(response);
    });
  };

  return (
    <div
      key={id}
      style={{
        width: '200px',
        minHeight: '200px',
        border: '1px solid black',
        textAlign: 'center',
        margin: '3px',
        // alignContent: 'space-between',
      }}
    >
      <div className="info">
        <div className="tag">date</div>
        <div>{date}</div>
      </div>
      <div className="info">
        <div className="tag">time</div>
        <div>
          {`${parseInt(startTime.slice(0, 2))}시`} ~{' '}
          {`${parseInt(endTime.slice(0, 2)) + 1}시`}
        </div>
      </div>
      <div className="info">
        <div className="tag">roomName</div>
        <div> {roomName}</div>
      </div>
      <div className="info">
        <div className="tag">leaderName</div>
        <div>{leaderName}</div>
      </div>
      <div className="info">
        <div className="tag">members </div>
        <div
          style={{
            // display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {members.map((member, m_idx) => {
            return <div key={m_idx}>{member} </div>;
          })}
        </div>
      </div>

      <div>
        <Button
          id={id}
          variant="dark"
          disabled={
            leaderName !== jwtDecode(localStorage.getItem('access-token')).sub
              ? true
              : false
          }
          onClick={handleClick}
        >
          &times;
        </Button>
      </div>
    </div>
  );
};

export default ReservationList;
