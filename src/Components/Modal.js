import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {
  getHeaders,
  getUserName,
  setTimeFormat,
  setToken,
} from '../utils/utils';
import '../styles/Modal.css';
import '../styles/ReservationList.css';
import { registerReservation } from '../api/api';

const Modal = ({ open, close, header, userInput, members, history }) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const {
    location,
    date,
    roomName,
    startTime,
    endTime,
    department,
    title,
    purpose,
  } = userInput;

  const infos = [
    '예약 날짜',
    '예약 장소',
    '예약 시간',
    '소속',
    '행사명',
    '사용목적',
    '팀원',
  ];

  const values = {
    [infos[0]]: date,
    [infos[1]]: roomName,
    [infos[2]]: startTime + '시 ~ ' + endTime + '시',
    [infos[3]]: department,
    [infos[4]]: title,
    [infos[5]]: purpose,
    [infos[6]]: members ? (
      <ul
        style={{
          listStyle: 'none',
          paddingLeft: '0px',
        }}
      >
        {members.map((member, idx) => {
          return <li key={idx}>{member}</li>;
        })}
      </ul>
    ) : (
      '없음'
    ),
  };

  const submit = async () => {
    try {
      // const response = await registerReservation(userInput);
      const response = await axios.post(
        'http://42meet.kro.kr/reservation/register',
        {
          location: location,
          roomName: roomName,
          date: date,
          startTime: setTimeFormat(startTime, 'start'),
          endTime: setTimeFormat(endTime, 'end'),
          leaderName: getUserName(),
          department: department,
          purpose: purpose,
          title: title,
          content: 'content',
          members: members,
        },
        { headers: getHeaders() }
      );
      setToken(response);
      history.push('/mypage');
    } catch (err) {
      if (err.statusCode === 400) {
        close();
      }
    }
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <div>
              {infos.map((text, idx) => {
                return (
                  <div className="info" key={idx}>
                    <div className="tag">{text}</div>
                    <div>{values[text]}</div>
                  </div>
                );
              })}
            </div>
          </main>
          <footer>
            {header === '예약 신청' ? (
              <button className="submit" onClick={submit}>
                submit
              </button>
            ) : null}
            {/* <button className="close" onClick={close}>
              close
            </button> */}
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default withRouter(Modal);
