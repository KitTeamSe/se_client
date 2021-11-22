import React from 'react';
import styled from 'styled-components';
import { CircularProgress, TextField, Button } from '@mui/material';

const LoadingCircle = styled(CircularProgress)`
  position: absolute;
  bottom: 50vh;
`;

const FindBox = styled.div`
  text-align: center;
  padding: 48px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  box-shadow: 0 0 5px #ccc;
  @media ${({ theme }) => theme.sizeQuery.tablet} {
    width: 100%;
  }
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    padding-left: 0;
    padding-right: 0;
    box-shadow: none;
  }
`;

const FormFlex = styled.form`
  display: flex;
  flex-direction: column;
  padding: 12px 24px 0px 24px;
`;

const FormTextField = styled(TextField)`
  width: 240px;
  min-width: 215px;
  margin: 4px;
`;

const TextFieldButtonBox = styled.div`
  display: flex;
  align-items: center;
`;

const QuestionBox = styled.div`
  padding-top: 12px;
  margin-top: 12px;
  font-size: 1rem;
  text-align: left;
`;

const YourIdBox = styled.div`
  padding-top: 12px;
  margin-top: 12px;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: left;
`;

const BoxTitle = styled.h2`
  margin-bottom: 12px;
  font-size: 1.2rem;
  font-weight: 600;
`;

const FindIdBox = props => {
  const { onFindIdSubmit, onChange, myInfoForm, findIdData, findIdLoading } =
    props;

  return (
    <FindBox>
      {findIdLoading && <LoadingCircle />}
      <BoxTitle>ID 찾기</BoxTitle>
      <FormFlex onSubmit={onFindIdSubmit}>
        <TextFieldButtonBox>
          <FormTextField
            autoFocus
            id="email"
            name="email"
            label="가입 이메일"
            variant="standard"
            onChange={onChange}
            value={myInfoForm.email}
            type="email"
          />
          <Button variant="contained" size="small" type="submit">
            아이디 조회
          </Button>
        </TextFieldButtonBox>
        {findIdData ? (
          <YourIdBox>{findIdData.data.id} 입니다</YourIdBox>
        ) : (
          <QuestionBox>아이디 조회를 하세요</QuestionBox>
        )}
      </FormFlex>
    </FindBox>
  );
};

const FindPwBox = props => {
  const {
    myInfoForm,
    findIdData,
    onChange,
    onFindQuestionSubmit,
    findQuestionData,
    findQuestionLoading,
    findPasswordLoading,
    findPasswordSubmit
  } = props;
  return (
    <FindBox>
      {findQuestionLoading && <LoadingCircle />}
      {findPasswordLoading && <LoadingCircle />}
      <BoxTitle> 비밀번호 찾기</BoxTitle>
      <FormFlex onSubmit={onFindQuestionSubmit}>
        <TextFieldButtonBox>
          <FormTextField
            id="userId"
            name="userId"
            label="ID"
            onChange={onChange}
            value={myInfoForm.userId}
            variant="standard"
            type="id"
          />
          {findIdData ? (
            <Button variant="contained" size="small" type="submit">
              내 질문 조회
            </Button>
          ) : (
            <Button variant="contained" size="small" disabled>
              내 질문 조회
            </Button>
          )}
        </TextFieldButtonBox>
        {findQuestionData ? (
          <YourIdBox>{findQuestionData.data.text}</YourIdBox>
        ) : (
          <QuestionBox>아이디를 입력하여 내 질문을 조회 하세요</QuestionBox>
        )}
      </FormFlex>
      <FormFlex onSubmit={findPasswordSubmit}>
        <TextFieldButtonBox>
          <FormTextField
            id="answer"
            name="answer"
            label="질문에 대한 답변"
            onChange={onChange}
            value={myInfoForm.answer}
            variant="standard"
            type="string"
          />
          {findQuestionData ? (
            <Button variant="contained" size="small" type="submit">
              비밀번호 전송
            </Button>
          ) : (
            <Button variant="contained" size="small" disabled>
              비밀번호 전송
            </Button>
          )}
        </TextFieldButtonBox>
      </FormFlex>
    </FindBox>
  );
};

const Forgot = props => {
  const {
    findIdData,
    findIdLoading,
    findQuestionData,
    findQuestionLoading,
    findPasswordLoading,
    onChange,
    myInfoForm,
    onFindIdSubmit,
    onFindQuestionSubmit,
    findPasswordSubmit
  } = props;
  return (
    <>
      <FindIdBox
        onFindIdSubmit={onFindIdSubmit}
        onChange={onChange}
        myInfoForm={myInfoForm}
        findIdData={findIdData}
        findIdLoading={findIdLoading}
      />
      <FindPwBox
        myInfoForm={myInfoForm}
        onChange={onChange}
        findIdData={findIdData}
        onFindQuestionSubmit={onFindQuestionSubmit}
        findQuestionData={findQuestionData}
        findQuestionLoading={findQuestionLoading}
        findPasswordSubmit={findPasswordSubmit}
        findPasswordLoading={findPasswordLoading}
      />
    </>
  );
};

export default Forgot;
