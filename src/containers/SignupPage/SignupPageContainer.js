import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SignupPage from '../../components/SignupPage/SignupPage';
import {
  changeField,
  signup,
  initializeForm,
  signin
} from '../../modules/auth';
import { questionList, typeList } from '../../DataExport';

const SignupPageContainer = () => {
  const history = useHistory();
  if (localStorage.token) {
    history.push('/');
  }

  const [error, setError] = useState(null);
  const { form, signupResponse, signupError, loading } = useSelector(
    ({ auth }) => ({
      form: auth.signup,
      signupResponse: auth.signupResponse.data,
      signupError: auth.signupResponse.error,
      loading: auth.signupResponse.loading
    })
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (signupError) {
      setError(String(signupError.message));
      return;
    }
    if (signupResponse) {
      const { id, password } = form;
      const value = id;
      dispatch(
        changeField({
          form: 'signin',
          key: 'id',
          value
        })
      );
      // signup 은 password 로 받고 signin 은 pw 로받아서 에러가 뜸
      const pw = password;
      dispatch(signin({ id, pw }));
      dispatch(initializeForm('signup'));
    }
  }, [signupResponse, signupError]);

  const handleChange = e => {
    const { value, id } = e.target;
    dispatch(
      changeField({
        form: 'signup',
        key: id,
        value
      })
    );
  };

  const questionChange = e => {
    const { value } = e.target;
    dispatch(
      changeField({
        form: 'signup',
        key: 'questionId',
        value
      })
    );
  };
  const classChange = e => {
    const { value } = e.target;
    dispatch(
      changeField({
        form: 'signup',
        key: 'type',
        value
      })
    );
  };

  const signupSubmit = e => {
    e.preventDefault();
    const {
      id,
      password,
      passwordCheck,
      email,
      phoneNumber,
      studentId,
      answer
    } = form;
    if (id === '') {
      setError('ID 를 입력하세요');
      return;
    }
    if (password.length < 4 || password.length > 20) {
      setError('password 는 4자 이상 12자 이하 입니다');
      return;
    }
    if (passwordCheck !== password) {
      setError('비밀번호가 일치하지 않습니다');
      return;
    }
    if (email.includes('@') === false) {
      setError('올바른 이메일 형식이 아닙니다');
      return;
    }
    if (phoneNumber.length < 10 || phoneNumber.length > 20) {
      setError('올바른 전화번호 길이가 아닙니다');
      return;
    }
    if (studentId.length !== 8) {
      setError('올바른 학번이 아닙니다');
      return;
    }
    if (answer === '') {
      setError('나만의 질문에 답하지 않았습니다');
      return;
    }
    dispatch(signup(form));
  };

  return (
    <SignupPage
      classChange={classChange}
      handleChange={handleChange}
      questionChange={questionChange}
      signupSubmit={signupSubmit}
      loading={loading}
      inputs={form}
      error={error}
      questionList={questionList}
      typeList={typeList}
    />
  );
};
export default SignupPageContainer;
