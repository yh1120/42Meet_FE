import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { getUserName } from '../utils/utils';
import axios from 'axios';

const Navigation = ({ history }) => {
  const [userRole, setUserRole] = useState('ROLE_USER');

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  const getUserRole = async () => {
    try {
      const response = await axios.get(
        `http://42meet.kro.kr/member/${getUserName()}/role`,
        { headers: { withCredentials: true } }
      );
    } catch (err) {
      console.log(err);
    }
    // setUserRole('ROLE_ADMIN');
  };

  useEffect(() => {
    // if (userName && getUserName()) getUserInfo();
    // if (getUserName()) getUserRole();
    getUserRole();
  }, []);

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">42Meet</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/booking">Reservation</Nav.Link>
            <Nav.Link href="/mypage">My Page</Nav.Link>
            {userRole === 'ROLE_ADMIN' && (
              <Nav.Link href="/admin">Admin</Nav.Link>
            )}
            <Nav.Link disabled>{getUserName()}</Nav.Link>
          </Nav>
          <Button variant="dark" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default withRouter(Navigation);
