import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

const Navigation = () => {
  const handleLogout = () => {
    // localStorage.removeItem('access_token');
    window.location.href = '/meeting';
  };
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/meeting">42Meet</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/meeting/reservation">Reservation</Nav.Link>
            <Nav.Link href="/meeting/mypage">My Page</Nav.Link>
          </Nav>
          <Button onClick={handleLogout}>Logout</Button>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
