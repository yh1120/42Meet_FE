import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../styles/Login.css';

const Login = ({ history }) => {
  const handleLogin = async () => {
    window.location.href = 'http://15.164.85.227:8080/login';
    // window.location.href = 'http://42meet.kro.kr/member/login';
  };

  useEffect(() => {
    if (
      localStorage.getItem('access-token') &&
      localStorage.getItem('refresh-token')
    ) {
      history.push('/booking');
    }
  });

  return (
    <div id="login-wrapper" style={{}}>
      <Button variant="dark" onClick={handleLogin}>
        Log In
      </Button>
    </div>
  );
};

export default withRouter(Login);
