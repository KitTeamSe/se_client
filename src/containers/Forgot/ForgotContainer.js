import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Forgot from '../../components/Forgot/Forgot';
import { findId, findQuestion, changeField } from '../../modules/find';

const ForgotContainer = () => {
  const dispatch = useDispatch();

  const {
    emailForm,
    findIdData,
    findIdLoading,
    findIdError,
    findQuestionData,
    findQuestionLoading,
    findQuestionError
  } = useSelector(({ find }) => ({
    emailForm: find.myEmail,
    findIdData: find.findIdRes.data,
    findIdLoading: find.findIdRes.loading,
    findIdError: find.findIdRes.error,
    findQuestionData: find.findQuestionRes.data,
    findQuestionLoading: find.findQuestionRes.loading,
    findQuestionError: find.findQuestionRes.error
  }));
  useEffect(() => {
    const userId = 'alsanrlf';
    dispatch(findQuestion({ userId }));
  }, []);

  const onChange = e => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'myEmail',
        key: name,
        value
      })
    );
  };

  const onFindIdSubmit = e => {
    e.preventDefault();
    const { email } = emailForm;
    dispatch(findId({ email }));
  };

  return (
    <Forgot
      question="내 질문 조회를 하세요"
      findIdData={findIdData}
      findIdLoading={findIdLoading}
      findIdError={findIdError}
      findQuestionData={findQuestionData}
      findQuestionError={findQuestionError}
      findQuestionLoading={findQuestionLoading}
      onChange={onChange}
      emailForm={emailForm}
      onFindIdSubmit={onFindIdSubmit}
    />
  );
};

export default ForgotContainer;
