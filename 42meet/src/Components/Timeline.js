import React from 'react';

const Timeline = ({ setRoom, reservationDatas, setTime }) => {
  let timeArray = [];
  for (let i = 0; i < 24; i++) {
    timeArray.push(i);
  }

  const handleClick = e => {
    setRoom(e.target.innerText);
  };

  const selectTime = e => {
    setTime(parseInt(e.target.id));
  };

  return (
    <div>
      <table border='1'>
        <thead>
          <tr>
            <th>개포</th>
            {timeArray.map(n => {
              return <th key={n}>{n < 10 ? `0${n}` : n}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {reservationDatas.map((reservationData, idx) => {
            const { room_type, start_time, end_time } = reservationData;
            return (
              <tr key={idx}>
                <td onClick={handleClick}>{room_type}</td>
                {timeArray.map((time, idx) => {
                  return start_time <= time && time < end_time ? (
                    <td key={idx} style={{ backgroundColor: 'grey' }}></td>
                  ) : (
                    <td
                      key={idx}
                      id={idx}
                      style={{ backgroundColor: 'green' }}
                      onClick={selectTime}
                    ></td>
                  );
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
