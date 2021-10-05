import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { withRouter } from 'react-router-dom';
import {
  changeField,
  initializeForm,
  initializeAuth,
  signin
} from '../../modules/auth';

import Signin from '../../components/Signin/Signin';

const LoginDialogContainer = props => {
  const { history } = props;
  const [error, setError] = useState(null);
  const [open, setPwChangeDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const { form, data, authError, loading } = useSelector(({ auth }) => ({
    form: auth.signin,
    data: auth.auth.data,
    authError: auth.auth.error,
    loading: auth.auth.loading
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
  };

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('userId'))
      history.push('/');
  }, []);

  useEffect(() => {
    if (authError) {
      setError(authError.message);
    }
    if (data) {
      localStorage.setItem(
        'token',
        JSON.stringify(data.data.token).replaceAll('"', '')
      );
      localStorage.setItem('userId', form.id);
      dispatch(initializeAuth());
      dispatch(initializeForm('signin'));
      history.push('/');
    }
    if (localStorage.getItem('token')) {
      setPwChangeDialogOpen(false);
      setError(null);
    }
  }, [data, authError, dispatch, loading]);

  return (
    <Signin
      onLogin={onLogin}
      open={open}
      onChange={onChange}
      form={form}
      error={error}
      loading={loading}
    />
  );
};

export default withRouter(LoginDialogContainer);
