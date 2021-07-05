import React, { useState, useEffect } from 'react';
import { Pagination } from '@material-ui/lab';
import { Button } from 'react-bootstrap';
import ReservationList from '../Components/ReservationList';
import { getMyReservations } from '../api/api';
import '../styles/MyPage.css';

const MyPage = () => {
  const buttonColor = {
    progress: 'secondary',
    scheduled: 'secondary',
    expired: 'secondary',
  };

  const [clickedButton, setClickedButton] = useState('scheduled');
  const [reservations, setReservations] = useState([]);
  const [waitReservations, setWaitReservations] = useState([]);
  const [colorForm, setColorForm] = useState({
    ...buttonColor,
    [clickedButton]: 'dark',
  });
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [waitPage, setWaitPage] = useState(1);
  const [waitMaxPage, setWaitMaxPage] = useState(1);

  const handleClick = (e) => {
    setClickedButton(e.target.id);
    setColorForm({
      ...buttonColor,
      [e.target.id]: 'dark',
    });
  };

  const getWaitReservations = async () => {
    try {
      const response = await getMyReservations('waiting', waitPage);
      setWaitReservations(response.data.reservations);
      setWaitMaxPage(response.data.maxPage);
    } catch (err) {
      console.log(err);
    }
  };

  const getReservations = async () => {
    try {
      const response = await getMyReservations(clickedButton, page);
      setReservations(response.data.reservations);
      setMaxPage(response.data.maxPage);
      console.log(response.data);

      if (clickedButton === 'scheduled') {
        getWaitReservations();
        // try {
        //   const response = await getMyReservations('waiting', waitPage);
        //   setWaitReservations(response.data.reservationResponseDtos);
        //   setWaitMaxPage(response.data.maxPage);
        //   // console.log(response.data.reservationResponseDtos);
        // } catch (err) {
        //   console.log(err);
        // }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = (event, value) => {
    console.log(event, value);
    setPage(value);
  };

  const handleWaitPageChange = (event, value) => {
    console.log(event, value);
    setWaitPage(value);
  };

  useEffect(() => {
    console.log('Mypage - useEffect([clickedButton])');
    getReservations();
  }, [clickedButton]);

  useEffect(() => {
    getReservations();
  }, [page]);

  useEffect(() => {
    getWaitReservations();
  }, [waitPage]);

  useEffect(() => {}, [waitPage]);
  return (
    <div>
      <div id="tag-wrapper">
        <Button
          id="progress"
          variant={colorForm.progress}
          onClick={handleClick}
        >
          진행중인 예약
        </Button>
        <Button
          id="scheduled"
          variant={colorForm.scheduled}
          onClick={handleClick}
        >
          다가올 예약
        </Button>
        <Button id="expired" variant={colorForm.expired} onClick={handleClick}>
          지난 예약
        </Button>
      </div>
      <div className="reservation-lists">
        {Array.from(waitReservations).map((reservation, idx) => {
          return (
            <ReservationList
              key={idx}
              reservation={reservation}
              clickedButton={'waitlist'}
            />
          );
        })}
        <Pagination
          count={waitMaxPage}
          variant="outlined"
          shape="rounded"
          onChange={handleWaitPageChange}
          page={waitPage}
        />
      </div>
      <div className="reservation-lists">
        {Array.from(reservations).map((reservation, idx) => {
          return (
            <ReservationList
              key={idx}
              reservation={reservation}
              clickedButton={clickedButton}
            />
          );
        })}
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

export default MyPage;
