import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Reservation from './pages/Reservation';
import MyPage from './pages/MyPage';
import MyPage2 from './pages/MyPage2';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" exact component={Login} /> */}
        <Redirect from="/" to="/booking" />
        <Route path="/booking" component={Reservation} />
        <Route path="/mypage" component={MyPage2} />
        {/* <Route path="/mypage" component={MyPage} /> */}
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
