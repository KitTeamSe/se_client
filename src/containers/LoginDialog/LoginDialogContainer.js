import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  changeField,
  initializeForm,
  initializeAuth,
  signin
} from '../../modules/auth';

import LoginDialog from '../../components/LoginDialog/LoginDialog';
import LogoutDialog from '../../components/LoginDialog/LogoutDialog';

const LoginDialogContainer = () => {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [open, setPwChangeDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const { form, data, authError, loading } = useSelector(({ auth }) => ({
    form: auth.signin,
    data: auth.auth.data,
    authError: auth.auth.error,
    loading: auth.auth.loading
  }));

  const handleClickOpen = () => {
    setPwChangeDialogOpen(true);
  };

  const handleClose = () => {
    setPwChangeDialogOpen(false);
    setError(null);
    dispatch(initializeForm('signin'));
  };

  const onChange = e => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'signin',
        key: name,
        value
      })
    );
  };

  const onLogin = e => {
    e.preventDefault();
    const { id, pw } = form;
    if (id === '') {
      setError('ID 를 입력하세요');
      return;
    }
    if (pw.length < 4 || pw.length > 12) {
      setError('비밀번호는 4자 이상 12자 이하입니다');
      return;
    }
    dispatch(signin({ id, pw }));
  };

  const onLogout = e => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    dispatch(initializeAuth());
    window.location.reload();
  };

  const ProfileClick = () => {
    history.push('/profile');
  };

  useEffect(() => {
    if (authError) {
      setError(String(error));
    }
    if (data) {
      localStorage.setItem(
        'token',
        JSON.stringify(data.data.token).replaceAll('"', '')
      );
      localStorage.setItem('userId', form.id);
      dispatch(initializeAuth());
      dispatch(initializeForm('signin'));
    }
    if (localStorage.getItem('token')) {
      setPwChangeDialogOpen(false);
      setError(null);
    }
  }, [data, authError, dispatch, loading]);

  return (
    <>
      {localStorage.getItem('token') ? (
        <LogoutDialog onLogout={onLogout} ProfileClick={ProfileClick} />
      ) : (
        <>
          <LoginDialog
            onLogin={onLogin}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            open={open}
            onChange={onChange}
            form={form}
            error={error}
            loading={loading}
          />
        </>
      )}
    </>
  );
};

export default LoginDialogContainer;
