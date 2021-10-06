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
import { questionList } from '../../DataExport';

const SignupPageContainer = () => {
  const history = useHistory();
  if (localStorage.token) {
    history.push('/');
  }

  const [infoState, setInfoState] = useState({
    id: false,
    password: false,
    passwordCheck: false,
    email: false,
    name: false,
    nickname: false,
    phoneNumber: false,
    studentId: false,
    answer: false
  });

  const { form, signupResponse, loading } = useSelector(({ auth }) => ({
    form: auth.signup,
    signupResponse: auth.signupResponse.data,
    loading: auth.signupResponse.loading
  }));

  const dispatch = useDispatch();

  useEffect(() => {
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
      const pw = password;
      dispatch(signin({ id, pw }));
      dispatch(initializeForm('signup'));
    }
  }, [signupResponse]);

  useEffect(() => {
    const { id } = form;
    if (id.length > 3 && id.length < 21) {
      setInfoState({ ...infoState, id: true });
    } else {
      setInfoState({ ...infoState, id: false });
    }
  }, [form.id]);

  useEffect(() => {
    const { password } = form;
    if (password.length > 7 && password.length < 21) {
      setInfoState({ ...infoState, password: true });
    } else {
      setInfoState({ ...infoState, password: false });
    }
  }, [form.password]);

  useEffect(() => {
    const { password, passwordCheck } = form;
    if (passwordCheck === password && passwordCheck.length !== 0) {
      setInfoState({ ...infoState, passwordCheck: true });
    } else {
      setInfoState({ ...infoState, passwordCheck: false });
    }
  }, [form.passwordCheck]);

  useEffect(() => {
    const { email } = form;
    const regText = /^[A-Za-z0-9]+@+[A-Za-z0-9-]+\.+[A-Za-z0-9-]/;

    if (regText.test(email)) {
      setInfoState({ ...infoState, email: true });
    } else {
      setInfoState({ ...infoState, email: false });
    }
  }, [form.email]);

  useEffect(() => {
    const { phoneNumber } = form;

    if (phoneNumber.length > 8 && phoneNumber.length < 14) {
      setInfoState({ ...infoState, phoneNumber: true });
    } else {
      setInfoState({ ...infoState, phoneNumber: false });
    }
  }, [form.phoneNumber]);

  useEffect(() => {
    const { name } = form;
    if (name.length > 1 && name.length < 13) {
      setInfoState({ ...infoState, name: true });
    } else {
      setInfoState({ ...infoState, name: false });
    }
  }, [form.name]);

  useEffect(() => {
    const { nickname } = form;
    if (nickname.length > 1 && nickname.length < 21) {
      setInfoState({ ...infoState, nickname: true });
    } else {
      setInfoState({ ...infoState, nickname: false });
    }
  }, [form.nickname]);

  useEffect(() => {
    const { studentId } = form;
    if (studentId.length === 8) {
      setInfoState({ ...infoState, studentId: true });
    } else {
      setInfoState({ ...infoState, studentId: false });
    }
  }, [form.studentId]);

  useEffect(() => {
    const { answer } = form;
    if (answer.length > 1 && answer.length < 101) {
      setInfoState({ ...infoState, answer: true });
    } else {
      setInfoState({ ...infoState, answer: false });
    }
  }, [form.answer]);

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

  const signupSubmit = e => {
    e.preventDefault();
    dispatch(signup(form));
  };

  return (
    <SignupPage
      handleChange={handleChange}
      questionChange={questionChange}
      signupSubmit={signupSubmit}
      loading={loading}
      inputs={form}
      questionList={questionList}
      infoState={infoState}
      setInfoState={setInfoState}
      form={form}
    />
  );
};
export default SignupPageContainer;
