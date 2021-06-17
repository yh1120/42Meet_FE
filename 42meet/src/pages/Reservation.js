import React, { useState } from "react";

const Reservation = () => {
  const now = new Date();
  let [selectedDate, setSelectedDate] = useState(
    now.toISOString().substring(0, 10)
  );
  const minDate = new Date(now.setDate(now.getDate() + 7))
    .toISOString()
    .substring(0, 10);
  const maxDate = new Date(now.setDate(now.getDate() + 14))
    .toISOString()
    .substring(0, 10);

  const onChange = (e) => {
    setSelectedDate(e.target.value);
    //axios
  };
  return (
    <div>
      <input
        type="date"
        id="start"
        name="Reservation"
        onChange={onChange}
        value={selectedDate}
        min={minDate}
        max={maxDate}
      ></input>
      <div></div>
    </div>
  );
};

export default Reservation;
