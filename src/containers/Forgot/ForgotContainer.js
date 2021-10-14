import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Forgot from '../../components/Forgot/Forgot';
import { findId } from '../../modules/account';

const ForgotContainer = () => {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(({ account }) => ({
    data: account.findIdRes.data,
    loading: account.findIdRes.loading,
    error: account.findIdRes.error
  }));
  const email = 'alsanrlf@naver.cm';
  useEffect(() => {
    dispatch(findId({ email }));
  }, []);
  console.log(data, error);
  return (
    <Forgot
      yourId="가입 이메일을 조회해 주세요"
      question="내 질문 조회를 하세요"
      data={data}
      loading={loading}
      error={error}
    />
  );
};

export default ForgotContainer;
