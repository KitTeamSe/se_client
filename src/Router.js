import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

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
    <Route path="/:boardId">
      <MainPage />
    </Route>
    <Route path="/">
      <Redirect to="/1" />
    </Route>
  </Switch>
);

export default Routes;
