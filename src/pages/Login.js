import React, { useEffect } from 'react';
import { getCookieValue } from '../utils/utils';

const Login = () => {
  const handleLogin = async () => {
    window.location.href = 'http://15.164.85.227:8080/login';
    // window.location.href = 'http://42meet.kro.kr/member/login'
  };

  useEffect(() => {
    if (getCookieValue('access_token') !== '')
      window.location.href = '/meeting/reservation';
  });

  return (
    <div>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default Login;
