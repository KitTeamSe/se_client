import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginDialogContainer from './containers/LoginDialog/LoginDialogContainer';
import SignupDialog from './components/SignupPage/SignupPage';
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
    <SignupDialog />
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
