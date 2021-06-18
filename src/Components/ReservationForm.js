import React, { useEffect, useState } from 'react';
import TimePicker from './Timepicker';

const ReservationForm = ({
  selectedRoom,
  startTime,
  setStartTime,
  reservationDatas,
  memberArray,
  setMemberArray,
  form,
  setForm,
  reservationTime,
}) => {
  const [memberInput, setMemberInput] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && memberInput !== '') {
      setMemberArray([...memberArray, memberInput]);
      setMemberInput('');
    }
  };

  const handleChange = (e) => {
    setMemberInput(e.target.value);
  };

  const handleInputChange = (e) => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextForm);
  };

  const handleClick = (e) => {
    const i = parseInt(e.target.id);
    setMemberArray(memberArray.slice(0, i).concat(memberArray.slice(i + 1)));
  };

  // useEffect(() => {
  // });

  return (
    <div>
      <div>선택된 회의실 : [{selectedRoom}]</div>
      <TimePicker
        name="startTime"
        startTime={startTime}
        setStartTime={setStartTime}
        selectedRoom={selectedRoom}
        reservationTime={reservationTime}
      ></TimePicker>
      <TimePicker
        name="endTime"
        startTime={startTime}
        setStartTime={setStartTime}
        selectedRoom={selectedRoom}
        reservationTime={reservationTime}
      ></TimePicker>
      <input
        type="text"
        name="department"
        value={form.department}
        placeholder="소속"
        onChange={handleInputChange}
      ></input>
      <input
        type="text"
        name="title"
        value={form.title}
        placeholder="행사명"
        onChange={handleInputChange}
      ></input>
      <input
        type="text"
        name="purpose"
        value={form.purpose}
        placeholder="사용목적"
        onChange={handleInputChange}
      ></input>
      <input
        type="text"
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        value={memberInput}
        placeholder="팀원을 입력해주세요"
      ></input>
      <div>{memberArray.length}</div>
      {memberArray.map((member, idx) => {
        return (
          <div id={idx} key={idx}>
            {member}
            <button id={idx} onClick={handleClick}>
              x
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ReservationForm;
