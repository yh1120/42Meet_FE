import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import Login from "./pages/Login";
import Reservation from "./pages/Reservation";
import MyPage from "./pages/MyPage";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/reservation" component={Reservation} />
        <Route path="/mypage" component={MyPage} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
