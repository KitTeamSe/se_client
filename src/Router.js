import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/SignupPage';

const Routes = () => (
  <Switch>
    <Route path="/profile">
      <ProfilePage />
    </Route>
    <Route path="/signup">
      <SignupPage />
    </Route>
    <Route path="/">
      <MainPage />
    </Route>
  </Switch>
);

export default Routes;
