import React, { useState } from 'react';
import TimePicker from './Timepicker';

const ReservationForm = ({ selectedRoom }) => {
  const [startTime, setStartTime] = useState(0);
  const [memberArray, setMemberArray] = useState([]);
  const [memberInput, setMemberInput] = useState('');
  const [form, setForm] = useState({
    department: '',
    title: '',
    purpose: ''
  });

  //   console.log(selectedRoom);
  //   const [endTime, setEndTime] = useState(0);

  //   const onClick = (e) => {
  //     setStartTime(e.target.value);
  //     console.log(e.target.value);
  //   };

  const handleKeyPress = e => {
    if (e.key === 'Enter' && memberInput !== '') {
      setMemberArray([...memberArray, memberInput]);
      setMemberInput('');
    }
  };

  const handleChange = e => {
    setMemberInput(e.target.value);
  };

  const onCha = e => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value
    };
    setForm(nextForm);
  };

  const handleClick = e => {
    const i = parseInt(e.target.id);
    setMemberArray(memberArray.slice(0, i).concat(memberArray.slice(i + 1)));
  };

  return (
    <div>
      <TimePicker startTime={0} setTime={setStartTime} name='startTime'></TimePicker>
      <TimePicker startTime={startTime} setTime={null} name='endTime'></TimePicker>
      <div>{selectedRoom}</div>
      <input
        type='text'
        name='department'
        value={form.department}
        placeholder='소속'
        onChange={onCha}
      ></input>
      <input
        type='text'
        name='title'
        value={form.title}
        placeholder='행사명'
        onChange={onCha}
      ></input>
      <input
        type='text'
        name='purpose'
        value={form.purpose}
        placeholder='사용목적'
        onChange={onCha}
      ></input>
      <input
        type='text'
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        value={memberInput}
        placeholder='팀원을 입력해주세요'
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
