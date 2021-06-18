import React from 'react';

const TimePicker = ({ startTime, setTime, name }) => {
  let timeArray = [];

  for (let i = 0; i < 24; i++) {
    timeArray.push(i);
  }

  const handleChange = e => {
    if (name === 'startTime') {
      let selectedTime = e.target.value;
      setTime(selectedTime.slice(0, selectedTime.length - 2));
    }
  };

  return (
    <div>
      <select onChange={handleChange}>
        {timeArray.map(n => {
          return (
            <option disabled={name === 'endTime' ? (n <= startTime ? true : false) : false}>
              {n < 12 ? `${n}AM` : `${n}PM`}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default TimePicker;
