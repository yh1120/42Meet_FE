import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation';
import axios from 'axios';
import { getHeaders, setToken } from '../utils/utils';
import { Button } from 'react-bootstrap';
import jwtDecode from 'jwt-decode';
// import ReservationList from '../Components/ReservationList';
import '../styles/MyPage.css';

const MyPage = () => {
  const [myReservations, setMyReservations] = useState(null);
  const [allReservations, setAllReservations] = useState(null);
  const [validate, setValidate] = useState(false);

  const buttonColor = {
    past: 'secondary',
    present: 'secondary',
    future: 'secondary',
  };
  const [colorForm, setColorForm] = useState({
    ...buttonColor,
    future: 'dark',
  });

  const getReservations = async () => {
    try {
      axios({
        url: 'http://15.164.85.227:8081/mypage',
        method: 'GET',
        headers: getHeaders(),
      }).then((response) => {
        setAllReservations(response.data);
        setMyReservations(response.data[1]);
        setToken(response);
        console.log(response.data);
        // console.log('mypage', response.data[0]); // 현재 시간 예약, 오름차순
        // console.log('mypage', response.data[1]); // 예정 예약, 오름차순
        // console.log('mypage', response.data[2]); // 과거 예약, 내림차순
      });
      setValidate(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleList = (e) => {
    const id = e.target.id;
    setColorForm({
      ...buttonColor,
      [id]: 'dark',
    });
    if (id === 'past') {
      console.log('past');
      setMyReservations(allReservations[2]);
    } else if (id === 'present') {
      console.log('present');
      setMyReservations(allReservations[0]);
    } else {
      console.log('future');
      setMyReservations(allReservations[1]);
    }
  };

  const handleClick = (e) => {
    const i = parseInt(e.target.id);
    axios({
      url: 'http://15.164.85.227:8081/delete',
      method: 'POST',
      headers: getHeaders(),
      data: {
        id: i,
      },
    }).then((response) => {
      console.log('응답', response);
      if (response.status === 200) {
        setValidate(true);
      }
      setToken(response);
    });
  };

  useEffect(() => {
    if (myReservations === null || validate === true) {
      getReservations();
    }
  }, [myReservations, validate]);

  //   useEffect(() => {
  //     if (myReservations === null) {
  //       getReservations();
  //     }
  //   }, [myReservations]);

  return (
    <div>
      <Navigation />
      {/* {reservationSeperate.map((seperate, idx) => {
        console.log(typeof seperate, seperate);
        return (
          <div>
            <div name={seperate}>{seperate}</div>
            <ReservationList seperate={seperate} />
          </div>
        );
      })} */}
      <div
        style={{
          display: 'flex',
          margin: '10px 10px 10px 10px',
          justifyContent: 'space-around',
        }}
      >
        <Button
          id="present"
          variant={colorForm.present}
          style={{ width: '115px' }}
          onClick={handleList}
        >
          진행중인 예약
        </Button>
        <Button
          id="future"
          variant={colorForm.future}
          style={{ width: '115px' }}
          onClick={handleList}
        >
          다가올 예약
        </Button>
        <Button
          id="past"
          variant={colorForm.past}
          style={{ width: '115px' }}
          onClick={handleList}
        >
          지난 예약
        </Button>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          minHeight: '300px',
        }}
      >
        {myReservations !== null
          ? Array.from(myReservations).map((reservation) => {
              const {
                date,
                startTime,
                endTime,
                roomName,
                members,
                leaderName,
                id,
              } = reservation;
              return (
                <div
                  key={id}
                  style={{
                    width: '200px',
                    minHeight: '200px',
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
                        return <div key={m_idx}>{member} </div>;
                      })}
                    </div>
                  </div>

                  <div>
                    <Button
                      id={id}
                      variant="dark"
                      disabled={
                        leaderName !==
                        jwtDecode(localStorage.getItem('access-token')).sub
                          ? true
                          : false
                      }
                      onClick={handleClick}
                    >
                      &times;
                    </Button>
                  </div>

                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};
export default MyPage;
