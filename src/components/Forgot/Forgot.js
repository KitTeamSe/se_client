import React from 'react';
import styled from 'styled-components';
import { TextField, Button } from '@mui/material';

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

const BoxTitle = styled.h2`
  margin-bottom: 12px;
  font-size: 1.2rem;
  font-weight: 600;
`;

const Forgot = props => {
  const { yourId, question } = props;
  return (
    <MainTable>
      <FindBox>
        <BoxTitle>ID 찾기</BoxTitle>
        <FormFlex>
          <TextFieldButtonBox>
            <FormTextField
              autoFocus
              id="email"
              name="email"
              label="가입 이메일"
              variant="standard"
              type="email"
            />
            <Button variant="contained" size="small">
              아이디 조회
            </Button>
          </TextFieldButtonBox>
          <QuestionBox>{yourId}</QuestionBox>
        </FormFlex>
      </FindBox>
      <FindBox>
        <BoxTitle> 비밀번호 찾기</BoxTitle>
        <FormFlex>
          <TextFieldButtonBox>
            <FormTextField
              autoFocus
              id="id"
              name="id"
              label="ID"
              variant="standard"
              type="id"
            />
            <Button variant="contained" size="small">
              내 질문 조회
            </Button>
          </TextFieldButtonBox>
          <QuestionBox>{question}</QuestionBox>
          <FormTextField
            id="answer"
            name="answer"
            label="질문에 대한 답변"
            variant="standard"
            type="string"
          />
        </FormFlex>
      </FindBox>
    </MainTable>
  );
};

export default Forgot;
