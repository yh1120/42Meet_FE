import React from 'react';
import { getHoursArray } from '../utils/utils';

const Timeline = ({
  userInput,
  setUserInput,
  location,
  meetingRooms,
  reservedTime
}) => {
  const timeArray = getHoursArray();

  const handleClick = e => {
    setUserInput({
      ...userInput,
      selectedRoom: e.target.innerText,
      selectedLocation: location
    });
  };

  return (
    <div>
      <table border="4">
        <thead>
          <tr>
            <th>{location}</th>
            {timeArray.map(n => {
              return <th key={n}>{n < 10 ? `0${n}` : n}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {meetingRooms.map((meetingRoom, idx) => {
            return (
              <tr key={idx}>
                <td onClick={handleClick}>{meetingRoom}</td>
                {timeArray.map((time, idx) => {
                  return reservedTime[meetingRoom] === undefined ||
                    reservedTime[meetingRoom].indexOf(time) !== -1 ? (
                    <td
                      key={idx}
                      style={{ backgroundColor: 'rgb(202, 211, 200)' }}
                    ></td>
                  ) : (
                    <td
                      key={idx}
                      style={{ backgroundColor: 'rgb(56, 103, 214)' }}
                    ></td>
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
