import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { getCookieValue } from '../utils/utils';
import { Button } from 'react-bootstrap';

const MyPage = () => {
  const [myReservations, setMyReservations] = useState(null);

  const getReservations = async () => {
    try {
      const response = await axios.get('http://15.164.85.227:8081/mypage', {
        access_token: getCookieValue('access_token')
      });
      // console.log('mypage', response.data[0]); // 현재 시간 예약, 오름차순
      // console.log('mypage', response.data[1]); // 예정 예약, 오름차순
      // console.log('mypage', response.data[2]); // 과거 예약, 내림차순
      setMyReservations(response.data[1]);
    } catch (err) {
      console.log(err);
    }
  };

  // const handleClick = (e) => {
  //   const i = parseInt(e.target.id);
  //   setMemberArray(memberArray.slice(0, i).concat(memberArray.slice(i + 1)));
  // };

  useEffect(() => {
    if (myReservations === null) {
      getReservations();
    }
  }, [myReservations]);
  return (
    <div>
      <Navigation />
      {myReservations !== null
        ? Array.from(myReservations).map((reservation, idx) => {
            const {
              date,
              startTime,
              endTime,
              roomName,
              participate,
              leaderName
            } = reservation;
            return (
              <div
                key={idx}
                style={{
                  border: '1px solid black',
                  textAlign: 'center',
                  margin: '3px'
                }}
              >
                <div>date: {date}</div>
                <div>
                  time: {startTime} ~ {endTime}
                </div>
                <div>roomName: {roomName}</div>
                <div>leaderName: {leaderName}</div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  participate: [
                  {participate.map((member, m_idx) => {
                    return <div key={m_idx}>{member}</div>;
                  })}
                  ]
                </div>
                <div>
                  <Button id={idx} variant="dark">
                    &times;
                  </Button>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default MyPage;
