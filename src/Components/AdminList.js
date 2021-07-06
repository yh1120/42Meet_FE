import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { getHeaders, getUserName, setToken } from '../utils/utils';
import MyPageModal from '../Components/MyPageModal';
import Modal from '../Components/Modal';
import { FcCheckmark, FcCancel } from 'react-icons/fc';
import '../styles/AdminList.css';
import { decideReservation } from '../api/api';

const AdminList = ({
  index,
  reservation,
  clickedButton,
  page,
  maxPage,
  waitingAllReservations,
  setWaitingAllReservations,
}) => {
  const reservationIntTime = {
    ...reservation,
    startTime: parseInt(reservation.startTime.slice(0, 2)),
    endTime: parseInt(reservation.endTime.slice(0, 2)) + 1,
  };
  const { date, startTime, endTime, roomName, id } = reservationIntTime;
  const [detailOpen, setDetailOpen] = useState(false);

  console.log('reservationIntTime', reservationIntTime, id);
  const access = async (e) => {
    console.log('access');
    console.log(e);
    console.log(e.target.id, typeof e.target.id);
    const i = parseInt(e.target.id);
    console.log(i);
    try {
      const response = await axios.post(
        'http://42meet.kro.kr/reservation/admin/decide',
        {
          id: i,
          result: true,
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
      console.log('access', response);
      let cnt = 0;
      if (response.status === 200) {
        Array.from(waitingAllReservations).forEach((reservation) => {
          if (reservation.id !== i) {
            cnt++;
          } else {
            return;
          }
        });
      }
      let temp = [];
      if (cnt === 0) {
        temp = waitingAllReservations.slice(1);
      } else if (cnt === waitingAllReservations.length - 1) {
        temp = waitingAllReservations.slice(0, cnt);
      } else {
        temp = waitingAllReservations
          .slice(0, cnt)
          .concat(
            waitingAllReservations.slice(cnt + 1, waitingAllReservations.length)
          );
      }
      setWaitingAllReservations(temp);
    } catch (err) {
      console.log(err);
    }
  };

  const deny = async (e) => {
    try {
      const i = parseInt(e.target.id);
      console.log(i);
      const response = await decideReservation(i, false);
      if (response.status === 200) {
      }
    } catch (err) {
      console.log(err);
    }
  };

  const openDetail = () => {
    setDetailOpen(true);
  };

  const closeDetail = () => {
    setDetailOpen(false);
  };

  return (
    <div
      key={id}
      className="adminList"
      //   style={{
      //     display: 'flex',
      //     border: '1px solid black',
      //     textAlign: 'center',
      //     margin: '3px',
      //   }}
    >
      <div className="title">
        <div className="title__in">
          <div className="title__props">{index + 1 + (page - 1) * 10}</div>
        </div>
        <div className="title__in">
          <div className="title__props">{date}</div>
        </div>
        <div className="title__in">
          <div className="title__props">
            {`${startTime}시`} ~ {`${endTime}시`}
          </div>
        </div>
        <div className="title__in">
          <div className="title__props"> {roomName}</div>
        </div>
        <div className="title__in">
          <Button id={id} variant="dark" onClick={openDetail}>
            detail
          </Button>
        </div>
        <div className="title__in">
          {clickedButton === 'waiting' && (
            <div className="title__props">
              <div>
                <Button
                  id={reservationIntTime.id}
                  variant="dark"
                  onClick={access}
                  style={{ fontSize: '1.1rem' }}
                >
                  <FcCheckmark />
                </Button>
              </div>
              <div>
                <Button
                  id={reservationIntTime.id}
                  variant="dark"
                  onClick={deny}
                  style={{ fontSize: '1.1rem' }}
                >
                  <FcCancel />
                </Button>
              </div>
            </div>
          )}
        </div>
        <Modal
          open={detailOpen}
          close={closeDetail}
          header="상세히 보기"
          userInput={reservationIntTime}
          members={reservation.members}
        ></Modal>
      </div>
    </div>
  );
};

export default AdminList;
