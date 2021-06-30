import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { getHeaders, setToken } from '../utils/utils';
import MyPageModal from '../Components/MyPageModal';

const ReservationList = ({ reservation, setValidate, clickedButton }) => {
  const { date, startTime, endTime, roomName, members, leaderName, id } =
    reservation;
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = (e) => {
    try {
      const i = parseInt(e.target.id);
      console.log(i);
      axios({
        url: 'http://42meet.kro.kr:9001/delete',
        method: 'POST',
        headers: getHeaders(),
        data: {
          id: i,
        },
      }).then((response) => {
        console.log('응답', response);
        setValidate(true);
        setToken(response);
        closeModal();
      });
    } catch (err) {
      console.log(err);
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div
      key={id}
      style={{
        width: '250px',
        border: '1px solid black',
        textAlign: 'center',
        margin: '3px',
        // alignContent: 'space-between',
      }}
    >
      <div className="info">
        <div className="tag">date</div>
        <div>{date}</div>
      </div>
      <div className="info">
        <div className="tag">time</div>
        <div>
          {`${parseInt(startTime.slice(0, 2))}시`} ~{' '}
          {`${parseInt(endTime.slice(0, 2)) + 1}시`}
        </div>
      </div>
      <div className="info">
        <div className="tag">roomName</div>
        <div> {roomName}</div>
      </div>
      <div className="info">
        <div className="tag">leaderName</div>
        <div>{leaderName}</div>
      </div>
      <div className="info">
        <div className="tag">members </div>
        <div
          style={{
            // display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {members.map((member, m_idx) => {
            return leaderName !== member ? (
              <div key={m_idx}>{member} </div>
            ) : null;
          })}
        </div>
      </div>
      <div>
        <Button
          id={id}
          variant="dark"
          disabled={
            leaderName !==
              jwtDecode(localStorage.getItem('access-token')).sub ||
            clickedButton === 'present'
              ? true
              : false
          }
          onClick={openModal}
        >
          &times;
        </Button>
      </div>
      <MyPageModal
        open={modalOpen}
        id={id}
        close={closeModal}
        header="Modal heading"
        handleClick={handleClick}
        //   members={memberArray}
      ></MyPageModal>
    </div>
  );
};

export default ReservationList;
