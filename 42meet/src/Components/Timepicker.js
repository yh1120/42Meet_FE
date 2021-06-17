import React from "react";

const TimePicker = ({ startTime, setTime, name }) => {
  let timeArray = [];
  let tempTime = 0;

  if (name !== "startTime") {
    tempTime = startTime;
  }
  for (let i = tempTime; i < 24; i++) {
    timeArray.push(i);
  }

  //   console.log(startTime);
  return (
    <div>
      <select
        onChange={(e) => {
          let selectedTime = e.target.value;
          setTime(selectedTime.slice(0, selectedTime.length - 2));
        }}
      >
        {timeArray.map((n) => {
          //   return <option>{n}</option>;
          return <option>{n < 12 ? `${n}AM` : `${n}PM`}</option>;
        })}
      </select>
    </div>
  );
};

export default TimePicker;
