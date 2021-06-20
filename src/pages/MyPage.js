import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation';
import axios from 'axios';

const MyPage = () => {
  const [myReservations, setMyReservations] = useState(null);

  const getReservations = async () => {
    try {
      // const response = await axios.get('http://15.164.85.227/reservation');
      // console.log(response);
      // setMyReservations(response);
      const exResponse = [
        {
          date: '2021-07-01',
          startTime: '11:00:00',
          endTime: '13:00:00',
          roomName: '1층',
          members: ['a', 'b', 'c'],
        },
        {
          date: '2021-07-02',
          startTime: '15:00:00',
          endTime: '19:00:00',
          roomName: '3층',
          members: ['a'],
        },
        {
          date: '2021-07-03',
          startTime: '21:00:00',
          endTime: '23:00:00',
          roomName: '3층 A',
          members: ['1', '2', '3', '4'],
        },
      ];
      setMyReservations(exResponse);
    } catch (err) {
      console.log(err);
    }
  };
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
            const { date, startTime, endTime, roomName, members } = reservation;
            return (
              <div
                key={idx}
                style={{
                  border: '1px solid red',
                  textAlign: 'center',
                  margin: '3px',
                }}
              >
                <div>date: {date}</div>
                <div>
                  time: {startTime} ~ {endTime}
                </div>
                <div>roomName: {roomName}</div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  members: [
                  {members.map((member, m_idx) => {
                    return <div key={m_idx}>{member}</div>;
                  })}
                  ]
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default MyPage;
