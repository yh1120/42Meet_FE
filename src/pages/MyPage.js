import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation';
import axios from 'axios';
// import jwtDecode from 'jwt-decode';
import { getCookieValue } from '../utils/utils';
import { Button } from 'react-bootstrap';
import jwtDecode from 'jwt-decode';
const MyPage = () => {
  const token = getCookieValue('access_token');
  const header = { access_token: token };
  const [myReservations, setMyReservations] = useState(null);
  const [validate, setValidate] = useState(false);
  const getReservations = async () => {
    try {
      axios({
        url: 'http://15.164.85.227:8081/mypage',
        method: 'GET',
        headers: header,
      }).then((response) => {
        setMyReservations(response.data[1]);
        // console.log('mypage', response.data[0]); // 현재 시간 예약, 오름차순
        // console.log('mypage', response.data[1]); // 예정 예약, 오름차순
        // console.log('mypage', response.data[2]); // 과거 예약, 내림차순
      });
      setValidate(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleClick = (e) => {
    const i = parseInt(e.target.id);
    axios({
      url: 'http://15.164.85.227:8081/delete',
      method: 'POST',
      headers: header,
      data: {
        id: i,
      },
    }).then((response) => {
      if (response.status === 200) {
        setValidate(true);
      }
    });
  };
  useEffect(() => {
    if (myReservations === null || validate === true) {
      getReservations();
    }
  }, [myReservations, validate]);
  return (
    <div>
      <Navigation />
      {myReservations !== null
        ? Array.from(myReservations).map((reservation) => {
            const {
              date,
              startTime,
              endTime,
              roomName,
              members,
              leaderName,
              id,
            } = reservation;
            return (
              <div
                key={id}
                style={{
                  border: '1px solid black',
                  textAlign: 'center',
                  margin: '3px',
                }}
              >
                <div>date: {date}</div>
                <div>
                  time: {startTime} ~ {endTime}
                </div>
                <div>roomName: {roomName}</div>
                <div>leaderName: {leaderName}</div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  members: [
                  {members.map((member, m_idx) => {
                    return <div key={m_idx}>{member} </div>;
                  })}
                  ]
                </div>
                <div>
                  <Button
                    id={id}
                    variant="dark"
                    disabled={
                      leaderName !== jwtDecode(token).sub ? true : false
                    }
                    onClick={handleClick}
                  >
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
