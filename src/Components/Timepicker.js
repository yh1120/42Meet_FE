import React, { useState, useEffect } from 'react';
import { getHoursArray } from '../utils/utils';

const TimePicker = ({ name, reservedTime, userInput, setUserInput }) => {
  const timeArray = getHoursArray();
  const { roomName } = userInput;
  const [earliestReservedTime, setEarliestReservedTime] = useState(23);

  const handleChange = (e) => {
    let selectedTime = e.target.value;
    if (name === 'startTime') {
      setUserInput({
        ...userInput,
        startTime: selectedTime.slice(0, selectedTime.length - 2),
      });
    } else {
      setUserInput({
        ...userInput,
        endTime: selectedTime.slice(0, selectedTime.length - 2),
      });
    }
  };

  useEffect(() => {
    // console.log(
    //   'Timepicker - useEffect([reservedTime, userInput.roomName, userInput.startTime])'
    // );
    if (reservedTime && userInput.roomName) {
      let time = 23;
      for (let i = 0; i < reservedTime[userInput.roomName].length; i++) {
        if (userInput.startTime < reservedTime[userInput.roomName][i]) {
          time = reservedTime[userInput.roomName][i];
          break;
        }
      }
      setEarliestReservedTime(time);
    }
  }, [reservedTime, userInput.roomName, userInput.startTime]);

  return (
    <div>
      <select
        disabled={
          roomName === ''
            ? true
            : name === 'endTime' && !userInput.startTime
            ? true
            : false
        }
        onChange={handleChange}
      >
        <option
          selected={
            (name === 'startTime' && userInput.startTime === null) ||
            (name === 'endTime' && userInput.endTime === null)
              ? true
              : false
          }
        >
          {name}
        </option>
        {timeArray.map((time, idx) => {
          return name === 'startTime' ? (
            <option
              key={idx}
              disabled={
                reservedTime === undefined ||
                reservedTime[roomName].indexOf(time) !== -1
              }
            >
              {time < 12 ? `${time}AM` : `${time}PM`}
            </option>
          ) : (
            <option
              key={idx}
              disabled={
                reservedTime === undefined ||
                reservedTime[roomName].indexOf(time - 1) !== -1 ||
                time > earliestReservedTime ||
                time <= userInput.startTime
              }
            >
              {time < 12 ? `${time}AM` : `${time}PM`}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default TimePicker;
