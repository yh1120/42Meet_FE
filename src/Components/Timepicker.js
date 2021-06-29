import React from 'react';
import { getHoursArray } from '../utils/utils';

const TimePicker = ({ name, reservedTime, userInput, setUserInput }) => {
  const timeArray = getHoursArray();
  const { selectedRoom } = userInput;

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

  return (
    <div>
      <select
        disabled={
          selectedRoom === ''
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
          return (
            <option
              key={idx}
              disabled={
                reservedTime === undefined ||
                reservedTime[selectedRoom].indexOf(time) !== -1
                  ? true
                  : name === 'endTime' && idx >= userInput.endTime
                  ? true
                  : false
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
