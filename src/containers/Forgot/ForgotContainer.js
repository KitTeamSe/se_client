import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Forgot from '../../components/Forgot/Forgot';
import { findId, findQuestion } from '../../modules/account';

const ForgotContainer = () => {
  const dispatch = useDispatch();

  const {
    findIdData,
    findIdLoading,
    findIdError,
    findQuestionData,
    findQuestionLoading,
    findQuestionError
  } = useSelector(({ account }) => ({
    findIdData: account.findIdRes.data,
    findIdLoading: account.findIdRes.loading,
    findIdError: account.findIdRes.error,
    findQuestionData: account.findQuestionRes.data,
    findQuestionLoading: account.findQuestionRes.loading,
    findQuestionError: account.findQuestionRes.error
  }));
  const email = 'alsanrlf@naver.com';
  const userId = 'alsanrlf';
  useEffect(() => {
    dispatch(findId({ email }));
    dispatch(findQuestion({ userId }));
  }, []);
  console.log(findIdData, findIdError);
  console.log(findQuestionData, findQuestionError, findQuestionLoading);

  return (
    <Forgot
      yourId="가입 이메일을 조회해 주세요"
      question="내 질문 조회를 하세요"
      findIdData={findIdData}
      findIdLoading={findIdLoading}
      findIdError={findIdError}
    />
  );
};

export default ForgotContainer;
