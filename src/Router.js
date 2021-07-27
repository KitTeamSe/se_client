import React from 'react';
import { Route } from 'react-router-dom';
import LoginDialogContainer from './containers/LoginDialog/LoginDialogContainer';
import SignupDialog from './components/LoginDialog/SignupDialog';

const Routes = () => (
  <>
    <LoginDialogContainer />
    <Route path="/signup">
      <SignupDialog />
    </Route>
  </>
);

export default Routes;
