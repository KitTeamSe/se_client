import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { initializeAuth } from '../../modules/auth';

const SignoutContainer = props => {
  const { history } = props;
  const dispatch = useDispatch();
  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    dispatch(initializeAuth());
    history.push('/');
    window.location.reload();
  };

  useEffect(() => {
    onLogout();
  }, []);

  return <></>;
};

export default withRouter(SignoutContainer);
