import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { useState } from 'react';
import Reservation from './pages/Reservation';
import MyPage from './pages/MyPage';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import Navigation from './Components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [user, setUser] = useState({
    userName: '',
    userRole: 'ROLE_USER',
  });

  return (
    <BrowserRouter>
      <Navigation user={user} setUser={setUser} />
      <Switch>
        <Route path="/" exact component={Reservation} />
        <Route path="/mypage" component={MyPage} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
