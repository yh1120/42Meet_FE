import React from "react";

const Timeline = ({ setRoom }) => {
  let meetingRooms = ["1층", "3층", "5층"];
  let timeArray = [];
  for (let i = 0; i < 24; i++) {
    timeArray.push(i);
  }

  const onClick = (e) => {
    setRoom(e.target.innerText);
  };

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>개포</th>
            {timeArray.map((n) => {
              return <th key={n}>{n < 10 ? `0${n}` : n}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {meetingRooms.map((meetingRoom, idx) => {
            return (
              <tr key={idx}>
                <td onClick={onClick}>{meetingRoom}</td>
                {timeArray.map((n) => {
                  return <td key={n}>O</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Timeline;
