import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Forgot from '../../components/Forgot/Forgot';
import {
  findId,
  findQuestion,
  findPassword,
  changeField
} from '../../modules/find';

const ForgotContainer = () => {
  const dispatch = useDispatch();

  const {
    myInfoForm,
    findIdData,
    findIdLoading,
    findIdError,
    findQuestionData,
    findQuestionLoading,
    findQuestionError,
    findPasswordData,
    findPasswordLoading,
    findPasswordError
  } = useSelector(({ find }) => ({
    myInfoForm: find.myInfo,
    findIdData: find.findIdRes.data,
    findIdLoading: find.findIdRes.loading,
    findIdError: find.findIdRes.error,
    findQuestionData: find.findQuestionRes.data,
    findQuestionLoading: find.findQuestionRes.loading,
    findQuestionError: find.findQuestionRes.error,
    findPasswordData: find.findPasswordRes.data,
    findPasswordLoading: find.findPasswordRes.loading,
    findPasswordError: find.findPasswordRes.error
  }));

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

  const findPasswordSubmit = e => {
    e.preventDefault();
    const { answer, email } = myInfoForm;
    const { questionId } = findQuestionData.data;
    const id = myInfoForm.userId;
    dispatch(findPassword({ answer, email, id, questionId }));
  };

  return (
    <Forgot
      findIdData={findIdData}
      findIdLoading={findIdLoading}
      findIdError={findIdError}
      findQuestionData={findQuestionData}
      findQuestionError={findQuestionError}
      findQuestionLoading={findQuestionLoading}
      findPasswordData={findPasswordData}
      findPasswordLoading={findPasswordLoading}
      findPasswordError={findPasswordError}
      onChange={onChange}
      myInfoForm={myInfoForm}
      onFindIdSubmit={onFindIdSubmit}
      onFindQuestionSubmit={onFindQuestionSubmit}
      findPasswordSubmit={findPasswordSubmit}
    />
  );
};

export default ForgotContainer;
