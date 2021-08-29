import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import ReplyTestPage from './pages/ReplyTestPage';
import SignupPage from './pages/SignupPage';

const Routes = () => (
  <Switch>
    <Route path="/board/:boardId/:postId">
      <ReplyTestPage />
    </Route>
    <Route path="/profile">
      <ProfilePage />
    </Route>
    <Route path="/signup">
      <SignupPage />
    </Route>
    <Route path="/board/:boardId">
      <MainPage />
    </Route>
    <Route path="/">
      <Redirect to="/board/1?page=1" />
    </Route>
  </Switch>
);

export default Routes;
