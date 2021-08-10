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
    <Route path="/free">
      <MainPage />
    </Route>
    <Route path="/archive">
      <MainPage />
    </Route>
    <Route path="/book">
      <MainPage />
    </Route>
    <Route path="/naver">
      <MainPage />
    </Route>
    <Route path="/pc">
      <MainPage />
    </Route>
    <Route path="/money">
      <MainPage />
    </Route>
    <Route path="/imac">
      <MainPage />
    </Route>
    <Route path="/330">
      <MainPage />
    </Route>
    <Route path="/">
      <MainPage />
    </Route>
  </Switch>
);

export default Routes;
