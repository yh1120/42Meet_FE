import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { getUserName } from '../utils/utils';
import axios from 'axios';
import { getRole } from '../api/api';

const Navigation = ({ history }) => {
  const [userRole, setUserRole] = useState('ROLE_USER');
  const [userName, setUserName] = useState('');

  const handleLogin = async () => {
    window.location.href = 'http://42meet.kro.kr/login';
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserName('');
    history.push('/booking');
  };

  const getUserRole = async () => {
    try {
      const response = await getRole(getUserName());
      setUserRole(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!userName) {
      setUserName(getUserName());
      getUserRole();
    }
  }, [userName]);

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/booking">42Meet</Navbar.Brand>
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

export default withRouter(Navigation);
