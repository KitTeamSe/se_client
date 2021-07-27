import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginDialogContainer from './containers/LoginDialog/LoginDialogContainer';
import SignupPageContainer from './containers/SignupPage/SignupPageContainer';
import ProfileContainer from './containers/ProfilePage/ProfilePageContainer';

const ProfilePage = () => (
  <>
    <LoginDialogContainer />
    <ProfileContainer />
  </>
);

const MainPage = () => (
  <>
    <LoginDialogContainer />
  </>
);

const SignupPage = () => (
  <>
    <LoginDialogContainer />
    <SignupPageContainer />
  </>
);

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
