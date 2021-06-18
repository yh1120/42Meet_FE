import React from "react";

const Login = () => {
  const handleLogin = () => {
    console.log("click");
    window.location.href = "/reservation";
  };
  return (
    <div>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default Login;
