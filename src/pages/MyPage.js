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
    setPage(1);
    setReservations([]);
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
      if (clickedButton === 'scheduled') {
        getWaitReservations();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleWaitPageChange = (event, value) => {
    setWaitPage(value);
  };

  const handleReservations = (id) => {
    getReservations();
  };

  const handleWaitReservations = (id) => {
    getWaitReservations();
  };

  useEffect(() => {
    console.log('Mypage - useEffect([clickedButton])');
    getReservations();
    setPage(1);
    setWaitPage(1);
  }, [clickedButton]);

  useEffect(() => {
    console.log('Mypage - useEffect([page])');
    getReservations();
  }, [page]);

  useEffect(() => {
    console.log('Mypage - useEffect([waitPage])');
    getWaitReservations();
  }, [waitPage]);

  return (
    <div>
      <div id="tag-wrapper">
        <Button
          id="scheduled"
          variant={colorForm.scheduled}
          onClick={handleClick}
        >
          다가올 예약
        </Button>
        <Button
          id="progress"
          variant={colorForm.progress}
          onClick={handleClick}
        >
          진행중인 예약
        </Button>
        <Button id="expired" variant={colorForm.expired} onClick={handleClick}>
          지난 예약
        </Button>
      </div>
      {clickedButton === 'scheduled' && (
        <div>
          <h4>waiting reservation</h4>
          <div className="reservation-lists">
            {waitReservations && Array.from(waitReservations).map((reservation, idx) => {
              return (
                <ReservationList
                  key={idx}
                  reservation={reservation}
                  clickedButton={'waitlist'}
                  handleReservations={handleWaitReservations}
                />
              );
            })}
          </div>
          <div className="pagination-wrapper">
            <Pagination
              count={waitMaxPage}
              variant="outlined"
              shape="rounded"
              onChange={handleWaitPageChange}
              page={waitPage}
            />
          </div>
        </div>
      )}

      <div>
        <h4>{clickedButton} reservation</h4>
        <div className="reservation-lists">
          {reservations.length === 0 && (
            <div className="no-reservation">No reservation!</div>
          )}
          {reservations && Array.from(reservations).map((reservation, idx) => {
            return (
              <ReservationList
                key={idx}
                reservation={reservation}
                clickedButton={clickedButton}
                handleReservations={handleReservations}
              />
            );
          })}
        </div>
        <div className="pagination-wrapper">
          <Pagination
            count={maxPage}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
            page={page}
          />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
