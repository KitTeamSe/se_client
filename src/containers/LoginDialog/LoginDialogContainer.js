import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeField,
  initializeForm,
  initializeAuth,
  signin
} from '../../modules/auth';
import LoginDialog from '../../components/LoginDialog/LoginDialog';
import LogoutDialog from '../../components/LoginDialog/LogoutDialog';

const LoginDialogContainer = () => {
  const [login, setLogin] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auths, authError } = useSelector(({ auth }) => ({
    form: auth.signin,
    auths: auth.auth,
    authError: auth.authError
  }));

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
    if (!error) {
      console.log('log in');
    }
  };

  const onLogout = e => {
    e.preventDefault();
    localStorage.removeItem('token');
    setLogin(false);
    console.log('log out');
  };

  useEffect(() => {
    if (authError) {
      setError(String(authError));
    }
    if (auths) {
      localStorage.setItem(
        'token',
        JSON.stringify(auths.data.token).replaceAll('"', '')
      );
      dispatch(initializeAuth());
      dispatch(initializeForm('signin'));
    }
    if (localStorage.getItem('token')) {
      setLogin(true);
      setError(false);
    }
  }, [auths, authError, dispatch]);

  return (
    <>
      {login ? (
        <LogoutDialog onLogout={onLogout} />
      ) : (
        <LoginDialog
          onLogin={onLogin}
          onChange={onChange}
          form={form}
          error={error}
        />
      )}
    </>
  );
};

export default LoginDialogContainer;
