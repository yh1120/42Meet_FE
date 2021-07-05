import React, { useEffect } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { getUserName } from '../utils/utils';
import { getRole } from '../api/api';
import { getCookieValue } from '../utils/utils';

const Navigation = ({ user, setUser }) => {
  const { userName, userRole } = user;

  const handleLogin = async () => {
    window.location.href = 'http://42meet.kro.kr/login';
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser({
      userName: '',
      userRole: 'ROLE_USER',
    });
  };

  const getUserRole = async (userName) => {
    try {
      const response = await getRole(userName);
      setUser({
        userName: userName,
        userRole: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log('Navagaion - useEffect([])');
    if (
      !localStorage.getItem('access-token') ||
      !localStorage.getItem('refresh-token')
    ) {
      handleLogout();
    } else if (!userName) {
      getUserRole(getUserName());
    }
  }, []);

  useEffect(() => {
    console.log('Navigation - useEffect()');
    let access_token = getCookieValue('access-token');
    let refresh_token = getCookieValue('refresh-token');

    if (access_token && refresh_token) {
      localStorage.setItem('access-token', access_token);
      localStorage.setItem('refresh-token', refresh_token);
      document.cookie = 'access-token=; path=/; max-age=0';
      document.cookie = 'refresh-token=; path=/; max-age=0';
    } else if (
      !localStorage.getItem('access-token') ||
      !localStorage.getItem('refresh-token')
    ) {
      localStorage.clear();
    }
  });

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">42Meet</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {userName && <Nav.Link href="/mypage">My Page</Nav.Link>}
            {userRole === 'ROLE_ADMIN' && (
              <Nav.Link href="/admin">Admin</Nav.Link>
            )}
          </Nav>
          <Nav.Link disabled>{userName}</Nav.Link>
          {!userName ? (
            <Button variant="light" onClick={handleLogin}>
              Login
            </Button>
          ) : (
            <Button variant="dark" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
