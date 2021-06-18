import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const handleLogout = () => {
    window.location.href = "/";
  };
  return (
    <div>
      <Link to="/reservation">예약 페이지</Link>
      <Link to="/myPage">마이 페이지</Link>
      <button onClick={handleLogout}>LogOut</button>
    </div>
  );
};

export default Navigation;
