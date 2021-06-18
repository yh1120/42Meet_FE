import React, { useState } from 'react';
import TimePicker from './Timepicker';

const ReservationForm = ({
  userInput,
  setUserInput,
  memberArray,
  setMemberArray,
  reservedTime,
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
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e) => {
    const i = parseInt(e.target.id);
    setMemberArray(memberArray.slice(0, i).concat(memberArray.slice(i + 1)));
  };

  return (
    <div>
      <div>선택된 회의실 : [{userInput.selectedRoom}]</div>
      <TimePicker
        name="startTime"
        userInput={userInput}
        setUserInput={setUserInput}
        reservedTime={reservedTime}
      ></TimePicker>
      <TimePicker
        name="endTime"
        userInput={userInput}
        setUserInput={setUserInput}
        reservedTime={reservedTime}
      ></TimePicker>
      <input
        type="text"
        name="department"
        value={userInput.department}
        placeholder="소속"
        onChange={handleInputChange}
      ></input>
      <input
        type="text"
        name="title"
        value={userInput.title}
        placeholder="행사명"
        onChange={handleInputChange}
      ></input>
      <input
        type="text"
        name="purpose"
        value={userInput.purpose}
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
      <div>입력된 팀원의 수 : {memberArray.length}</div>
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
