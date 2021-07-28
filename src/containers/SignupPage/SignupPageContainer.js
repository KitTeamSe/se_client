import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignupPage from '../../components/SignupPage/SignupPage';
import { changeField, signup, signin } from '../../modules/auth';

const SignupPageContainer = () => {
  const [error, setError] = useState(null);
  const { form } = useSelector(({ auth }) => ({
    form: auth.signup
  }));
  const dispatch = useDispatch();

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

  const quetionChange = e => {
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
      console.log('log in');
      dispatch(signin(form));
    }
  };
  return (
    <SignupPage
      classChange={classChange}
      handleChange={handleChange}
      quetionChange={quetionChange}
      signupSubmit={signupSubmit}
      inputs={form}
      error={error}
    />
  );
};
export default SignupPageContainer;
