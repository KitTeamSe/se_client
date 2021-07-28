import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SignupPage from '../../components/SignupPage/SignupPage';
import { changeField, signup, initializeForm } from '../../modules/auth';

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
      setError(String(authError));
      return;
    }
    if (signupResponse) {
      dispatch(initializeForm('signup'));
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
    const { id } = form;
    if (id === '') {
      setError('ID 를 입력하세요');
      return;
    }
    dispatch(signup(form));
    if (!error) {
      console.log('error 없음');
    }
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
