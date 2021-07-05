import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { getUserName, setToken } from '../utils/utils';
import MyPageModal from '../Components/MyPageModal';
import Modal from '../Components/Modal';
import '../styles/ReservationList.css';
import { deleteReservation } from '../api/api';

const ReservationList = ({
  reservation,
  clickedButton,
  handleReservations,
}) => {
  const reservationIntTime = {
    ...reservation,
    startTime: parseInt(reservation.startTime.slice(0, 2)),
    endTime: parseInt(reservation.endTime.slice(0, 2)) + 1,
  };
  const { date, startTime, endTime, roomName, members, leaderName, id } =
    reservationIntTime;
  const [deleteOpen, setModalOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleClick = async (e) => {
    try {
      const response = await deleteReservation(e.target.id);
      setToken(response);
      closeDelete();
      handleReservations(e.target.id);
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

  const openDelete = () => {
    setModalOpen(true);
  };

  const closeDelete = () => {
    setModalOpen(false);
  };

  return (
    <div
      key={id}
      style={{
        width: '260px',
        border: '1px solid black',
        textAlign: 'center',
        margin: '10px',
      }}
    >
      <div className="info">
        <div className="tag">날짜</div>
        <div>{date}</div>
      </div>
      <div className="info">
        <div className="tag">예약 시간</div>
        <div>
          {`${startTime}시`} ~ {`${endTime}시`}
        </div>
      </div>
      <div className="info">
        <div className="tag">회의실</div>
        <div> {roomName}</div>
      </div>
      <div className="info">
        <div className="tag">팀장</div>
        <div>{leaderName}</div>
      </div>
      <div className="info">
        <div className="tag">인원</div>
        <div>{members.length}명</div>
      </div>
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <div style={{ width: '50%' }}>
            <Button id={id} variant="dark" onClick={openDetail}>
              detail
            </Button>
          </div>
          <div style={{ width: '50%' }}>
            <Button
              id={id}
              variant="dark"
              disabled={
                leaderName !== getUserName() ||
                clickedButton === 'past' ||
                clickedButton === 'present'
                  ? true
                  : false
              }
              onClick={openDelete}
            >
              &times;
            </Button>
          </div>
        </div>
      </div>
      <Modal
        open={detailOpen}
        close={closeDetail}
        header="상세히 보기"
        userInput={reservationIntTime}
        members={reservation.members}
      ></Modal>

      <MyPageModal
        open={deleteOpen}
        id={id}
        close={closeDelete}
        header="예약 삭제"
        handleClick={handleClick}
        //   members={memberArray}
      ></MyPageModal>
    </div>
  );
};

export default ReservationList;
