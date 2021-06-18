import React from 'react';

const TimePicker = ({ name, startTime, setTime, reservationDatas }) => {
  let timeArray = [];

  for (let i = 0; i < 24; i++) {
    timeArray.push(i);
  }

  const handleChange = (e) => {
    let selectedTime = e.target.value;
    setTime(selectedTime.slice(0, selectedTime.length - 2));
  };

  return (
    <div>
      <select onChange={handleChange}>
        {timeArray.map((time, idx) => {
          const { start_time, end_time } = reservationDatas;
          console.log(reservationDatas);
          console.log(start_time, end_time);
          return (
            <option
              key={idx}
              selected={time === startTime ? true : false}
              disabled={
                name === 'endTime' ? (time <= startTime ? true : false) : false
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
