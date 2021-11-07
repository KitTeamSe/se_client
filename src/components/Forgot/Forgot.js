import React from 'react';
import styled from 'styled-components';
import { CircularProgress, TextField, Button } from '@mui/material';

const LoadingCircle = styled(CircularProgress)`
  position: absolute;
  bottom: 50vh;
`;

const MainTable = styled.div`
  padding: 12px;
  margin: 8px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: flex;
  justify-content: center;
`;

const FindBox = styled.div`
  text-align: center;
  margin: 48px;
`;

const FormFlex = styled.form`
  display: flex;
  flex-direction: column;
  padding: 12px 24px 0px 24px;
`;

const FormTextField = styled(TextField)`
  min-width: 280px;
  margin: 4px;
  margin="dense"
  variant="standard"
  fullWidth
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
    onChange,
    onFindQuestionSubmit,
    findQuestionData,
    findQuestionLoading
  } = props;
  return (
    <FindBox>
      {findQuestionLoading && <LoadingCircle />}
      <BoxTitle> 비밀번호 찾기</BoxTitle>
      <FormFlex onSubmit={onFindQuestionSubmit}>
        <TextFieldButtonBox>
          <FormTextField
            autoFocus
            id="userId"
            name="userId"
            label="ID"
            onChange={onChange}
            value={myInfoForm.userId}
            variant="standard"
            type="id"
          />
          <Button variant="contained" size="small" type="submit">
            내 질문 조회
          </Button>
        </TextFieldButtonBox>
        {findQuestionData ? (
          <YourIdBox>{findQuestionData.data.userId} 입니다</YourIdBox>
        ) : (
          <QuestionBox>아이디 조회를 하세요</QuestionBox>
        )}
      </FormFlex>
      <FormFlex>
        <TextFieldButtonBox>
          <FormTextField
            id="answer"
            name="answer"
            label="질문에 대한 답변"
            variant="standard"
            type="string"
          />
          <Button variant="contained" size="small">
            비밀번호 전송
          </Button>
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
    onChange,
    myInfoForm,
    onFindIdSubmit,
    onFindQuestionSubmit
  } = props;
  return (
    <MainTable>
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
        onFindQuestionSubmit={onFindQuestionSubmit}
        findQuestionData={findQuestionData}
        findQuestionLoading={findQuestionLoading}
      />
    </MainTable>
  );
};

export default Forgot;
