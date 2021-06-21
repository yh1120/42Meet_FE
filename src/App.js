import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Reservation from './pages/Reservation';
import MyPage from './pages/MyPage';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/meeting" exact component={Login} />
        <Route path="/meeting/reservation" component={Reservation} />
        <Route path="/meeting/mypage" component={MyPage} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
