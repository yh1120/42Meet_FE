import React, { useState } from "react";
import Timeline from "../Components/Timeline";
import ReservationForm from "../Components/ReservationForm";

const Reservation = () => {
  const now = new Date();
  const [selectedRoom, setSelectedRoom] = useState("");

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
      <Timeline setRoom={setSelectedRoom} />
      <Timeline setRoom={setSelectedRoom} />
      <ReservationForm selectedRoom={selectedRoom} />
    </div>
  );
};

export default Reservation;
