import React from 'react';
import { withRouter } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { getUserName } from '../utils/utils';

const Navigation = ({ history }) => {
  const handleLogout = () => {
    // localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">42Meet</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/booking">Reservation</Nav.Link>
            <Nav.Link href="/mypage">My Page</Nav.Link>
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
