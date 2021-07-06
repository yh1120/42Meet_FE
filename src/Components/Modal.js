import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
  getHeaders,
  getUserName,
  setTimeFormat,
  setToken,
} from '../utils/utils';
import { registerReservation } from '../api/api';
import '../styles/Modal.css';
import '../styles/ReservationList.css';

const Modal = ({ open, close, header, userInput, members }) => {
  const history = useHistory();
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
        {
          headers: Object.assign(
            {
              withCredentials: true,
            },
            getHeaders()
          ),
        }
      );
      setToken(response);
      alert('예약이 관리자에게 승인되면 활성화 됩니다!');
      history.push('/mypage');
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        alert('오류가 발생했습니다. 다시 로그인해주세요.');
        close();
        window.location.reload();
      } else if (err.response.status === 409) {
        alert('시간이 중복됩니다. 다른 시간대를 선택해주세요.');
        window.location.reload();
      } else if (err.response.status === 442) {
        alert('예약 가능 횟수를 초과했습니다.');
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
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
