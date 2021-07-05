import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Pagination } from '@material-ui/lab';
import '../styles/Admin.css';
import axios from 'axios';
import { getHeaders, setToken } from '../utils/utils';
import { getAllReservations, getAllWaitingReservations } from '../api/api';
import AdminList from '../Components/AdminList';
import { wait } from '@testing-library/react';

const Admin = () => {
  const buttonColor = {
    waiting: 'secondary',
    expired: 'secondary',
    progress: 'secondary',
    scheduled: 'secondary',
  };
  const pageBlock = 10;

  const [allReservations, setAllReservations] = useState(null);
  const [waitingAllReservations, setWaitingAllReservations] = useState(null);
  const [clickedButton, setClickedButton] = useState('waiting');
  const [colorForm, setColorForm] = useState({
    ...buttonColor,
    [clickedButton]: 'dark',
  });
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const getReservations = async () => {
    try {
      if (clickedButton !== 'waiting') {
        const response = await getAllReservations(
          clickedButton,
          page,
          pageBlock
        );
        setAllReservations(response.data.reservations);
        setMaxPage(response.data.maxPage);
        console.log(response.data);
      } else if (clickedButton === 'waiting' && page === 1) {
        const response = await getAllWaitingReservations();
        setWaitingAllReservations(response.data);
        const total_len = response.data.length;
        let tmp_maxPage = 0;
        if (total_len % pageBlock !== 0)
          tmp_maxPage = total_len / pageBlock + 1;
        else if (total_len / pageBlock !== 0)
          tmp_maxPage = total_len / pageBlock;
        else tmp_maxPage = 0;
        setMaxPage(parseInt(tmp_maxPage));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sliceReservations = () => {
    const temp = waitingAllReservations.slice(
      (page - 1) * pageBlock,
      page * pageBlock
    );
    console.log('slice', temp);
    setAllReservations(temp);
  };

  const handleList = (e) => {
    const id = e.target.id;
    setClickedButton(id);
    setColorForm({
      ...buttonColor,
      [id]: 'dark',
    });
    setPage(1);
    // if (id === 'waiting') {
    //   console.log('waiting');
    // } else if (id === 'expired') {
    //   console.log('expired');
    // } else if (id === 'progress') {
    //   console.log('progress');
    // } else {
    //   console.log('scheduled');
    // }
  };

  const handlePageChange = (event, value) => {
    // console.log(event, value);
    setPage(value);
  };

  useEffect(() => {
    getReservations();
  }, [clickedButton, page]);

  useEffect(() => {
    if (waitingAllReservations !== null) sliceReservations();
  }, [waitingAllReservations]);

  return (
    <div className="main">
      <div
        style={{
          display: 'flex',
          margin: '10px 10px 10px 10px',
          justifyContent: 'space-around',
        }}
      >
        <Button
          id="waiting"
          variant={colorForm.waiting}
          style={{ width: '115px' }}
          onClick={handleList}
        >
          대기중인 예약
        </Button>
        <Button
          id="scheduled"
          variant={colorForm.scheduled}
          style={{ width: '115px' }}
          onClick={handleList}
        >
          다가올 예약
        </Button>
        <Button
          id="progress"
          variant={colorForm.progress}
          style={{ width: '115px' }}
          onClick={handleList}
        >
          진행중인 예약
        </Button>
        <Button
          id="expired"
          variant={colorForm.expired}
          style={{ width: '115px' }}
          onClick={handleList}
        >
          지난 예약
        </Button>
      </div>
      <div className="reservationList">
        <div className="title">
          <div className="title__in">
            <div className="title__props">index</div>
          </div>
          <div className="title__in">
            <div className="title__props">date</div>
          </div>
          <div className="title__in">
            <div className="title__props">time</div>
          </div>
          <div className="title__in">
            <div className="title__props">room</div>
          </div>
          {/* <div className="title__in">
            <div className="title__props">leader</div>
          </div>
          <div className="title__in">
            <div className="title__props">number</div>
          </div> */}
          <div className="title__in">
            <div className="title__props">detail</div>
          </div>
          <div className="title__in">
            <div className="title__props">checkbox</div>
          </div>
        </div>
        <div>
          {allReservations &&
            Array.from(allReservations).map((reservation, idx) => {
              return (
                <AdminList
                  index={idx}
                  reservation={reservation}
                  clickedButton={clickedButton}
                  page={page}
                  maxPage={maxPage}
                  waitingAllReservations={waitingAllReservations}
                  setWaitingAllReservations={setWaitingAllReservations}
                />
              );
            })}
        </div>
      </div>
      <div
        style={{
          position: 'fixed',
          bottom: '10px',
          width: '100%',
        }}
      >
        <Pagination
          count={maxPage}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
          page={page}
        />
      </div>
    </div>
  );
};

export default Admin;
