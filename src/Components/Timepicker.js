import React from 'react';

const TimePicker = ({
  name,
  startTime,
  setStartTime,
  selectedRoom,
  reservationTime,
}) => {
  let timeArray = [];

  for (let i = 0; i < 24; i++) {
    timeArray.push(i);
  }

  const handleChange = (e) => {
    let selectedTime = e.target.value;
    if (name === 'startTime') {
      setStartTime(selectedTime.slice(0, selectedTime.length - 2));
    }
  };

  return (
    <div>
      <select
        onChange={handleChange}
        disabled={selectedRoom === '' ? true : false}
      >
        {timeArray.map((time, idx) => {
          return (
            <option
              key={idx}
              selected={time === startTime ? true : false}
              disabled={
                reservationTime[selectedRoom] !== undefined &&
                reservationTime[selectedRoom].indexOf(time) !== -1
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
