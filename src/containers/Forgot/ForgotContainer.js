import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Forgot from '../../components/Forgot/Forgot';
import { findId, findQuestion, changeField } from '../../modules/find';

const ForgotContainer = () => {
  const dispatch = useDispatch();

  const {
    myInfoForm,
    findIdData,
    findIdLoading,
    findIdError,
    findQuestionData,
    findQuestionLoading,
    findQuestionError
  } = useSelector(({ find }) => ({
    myInfoForm: find.myInfo,
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
        form: 'myInfo',
        key: name,
        value
      })
    );
  };

  const onFindIdSubmit = e => {
    e.preventDefault();
    const { email } = myInfoForm;
    dispatch(findId({ email }));
  };

  const onFindQuestionSubmit = e => {
    e.preventDefault();
    const { userId } = myInfoForm;
    dispatch(findQuestion({ userId }));
  };

  return (
    <Forgot
      findIdData={findIdData}
      findIdLoading={findIdLoading}
      findIdError={findIdError}
      findQuestionData={findQuestionData}
      findQuestionError={findQuestionError}
      findQuestionLoading={findQuestionLoading}
      onChange={onChange}
      myInfoForm={myInfoForm}
      onFindIdSubmit={onFindIdSubmit}
      onFindQuestionSubmit={onFindQuestionSubmit}
    />
  );
};

export default ForgotContainer;
