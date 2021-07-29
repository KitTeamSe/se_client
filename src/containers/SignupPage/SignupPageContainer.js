import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SignupPage from '../../components/SignupPage/SignupPage';
import {
  changeField,
  signup,
  initializeForm,
  initializeAuth,
  signin
} from '../../modules/auth';

const SignupPageContainer = () => {
  const history = useHistory();
  const [error, setError] = useState(null);
  const { form, signupResponse, authError } = useSelector(({ auth }) => ({
    form: auth.signup,
    signupResponse: auth.signupResponse,
    authError: auth.authError
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (authError) {
      setError(JSON.stringify(authError.message));
      return;
    }
    if (signupResponse) {
      console.log(JSON.stringify(signupResponse.message));
      const { id, password } = form;
      const pw = password;
      dispatch(signin({ id, pw }));
      console.log('로그인 시도');
      dispatch(initializeForm('signup'));
      dispatch(initializeAuth());

      history.push('/');
    }
  }, [signupResponse, authError]);

  // Select 는 작동방식을 알수가 없고 inputs 안에 들어가질 않아서 뺴놨습니다.
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
      inputs={form}
      error={error}
    />
  );
};
export default SignupPageContainer;
