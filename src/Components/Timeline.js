import React from 'react';
import { range } from '../utils/utils';

const Timeline = ({ setRoom, reservationDatas, meetingRooms }) => {
  let timeArray = [];
  let reservationTime = [];

  for (let i = 0; i < 24; i++) {
    timeArray.push(i);
  }

  const handleClick = (e) => {
    setRoom(e.target.innerText);
  };

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>개포</th>
            {timeArray.map((n) => {
              return <th key={n}>{n < 10 ? `0${n}` : n}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {meetingRooms.map((meetingRoom, idx) => {
            {
              let temp = reservationDatas.filter(
                (ele) => ele.room_type === meetingRoom
              );
              reservationTime = [];
              for (let i = 0; i < temp.length; i++) {
                let { start_time, end_time } = temp[i];
                reservationTime = reservationTime.concat(
                  range(parseInt(start_time), parseInt(end_time))
                );
              }
            }
            return (
              <tr key={idx}>
                <td onClick={handleClick}>{meetingRoom}</td>
                {timeArray.map((time, idx) => {
                  return reservationTime.indexOf(time) !== -1 ? (
                    <td key={idx} style={{ backgroundColor: 'grey' }}></td>
                  ) : (
                    <td key={idx} style={{ backgroundColor: 'green' }}></td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Timeline;
