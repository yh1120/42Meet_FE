import React from 'react';
import { getHoursArray } from '../utils/utils';
import { Table } from 'react-bootstrap';
import '../styles/Timeline.css';

const Timeline = ({
  userInput,
  setUserInput,
  location,
  meetingRooms,
  reservedTime,
}) => {
  const timeArray = getHoursArray();

  const handleClick = (e) => {
    setUserInput({
      ...userInput,
      selectedRoom: e.target.innerText,
      selectedLocation: location,
    });
  };

  return (
    <div id="timeline-wrapper">
      <Table responsive size="sm">
        <thead>
          <tr>
            <th style={{ width: '7%', textAlign: 'center' }}>{location}</th>
            {Array.from({ length: 24 }).map((_, index) => (
              <th key={index} style={{ textAlign: 'center', width: '3%' }}>
                {index}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {meetingRooms.map((meetingRoom, idx) => {
            return (
              <tr key={idx}>
                <td
                  onClick={handleClick}
                  style={{ height: '30px', textAlign: 'center' }}
                >
                  {meetingRoom}
                </td>
                {timeArray.map((time, idx) => {
                  return reservedTime === undefined ||
                    reservedTime[meetingRoom].indexOf(time) !== -1 ? (
                    <td
                      key={idx}
                      style={{
                        backgroundColor: 'rgb(202, 211, 200)',
                        border: '1px solid black',
                        padding: '1px',
                      }}
                    ></td>
                  ) : (
                    <td
                      key={idx}
                      style={{
                        backgroundColor: 'white',
                        border: '1px solid black',
                        padding: '1px',
                      }}
                    ></td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Timeline;
