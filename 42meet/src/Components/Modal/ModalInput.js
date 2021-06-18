import React from "react";

const ModalInput = ({
  selectedDate,
  selectedRoom,
  startTime,
  endTime,
  department,
  title,
  purpose,
  members,
}) => {
  const infos = [
    "예약 날짜",
    "예약 장소",
    "예약 시간",
    "소속",
    "행사명",
    "사용목적",
    "팀원",
  ];
  const values = {
    [infos[0]]: selectedDate,
    [infos[1]]: selectedRoom,
    [infos[2]]: startTime + "시 ~ " + endTime + "시",
    [infos[3]]: department,
    [infos[4]]: title,
    [infos[5]]: purpose,
    [infos[6]]: members ? (
      <ul>
        {members.map((member, idx) => {
          return <li>{member}</li>;
        })}
      </ul>
    ) : (
      "없음"
    ),
  };

  return (
    <div>
      {infos.map((text, idx) => {
        return (
          <div>
            <div key={text}>{text}</div>
            <div>{values[text]}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ModalInput;
