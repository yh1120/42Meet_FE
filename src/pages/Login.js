import React, { useEffect } from 'react';
import axios from 'axios';

const Login = () => {
  const handleLogin = async () => {
    try {
      // window.location.href = '/meeting/reservation';
      const response = await axios.get('http://15.164.85.227:8080/login');
      // const response = await axios.get('http://15.164.85.227:8080/member/login');
      console.log(response.headers);
    } catch (err) {
      console.log(err);
      // window.location.href = '/';
    }
  };
  useEffect(() => {
    if (localStorage.getItem('m_auth') !== null)
      window.location.href = '/meeting/reservation';
  });
  return (
    <div>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default Login;
