import React from 'react';
import styled, { keyframes } from 'styled-components';
import {
  TextField,
  Select,
  InputLabel,
  MenuItem,
  Button,
  CircularProgress
} from '@material-ui/core';

const LoadingCircle = styled(CircularProgress)`
  position: absolute;
  bottom: 50vh;
`;

const FormField = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const Welcome = styled.div`
  margin: 24px;
  font-size: 24px;
`;

const FormTextField = styled(TextField)`
  margin: 4px;
  margin="dense"
`;

const FormSelectField = styled(Select)`
  margin: 6px;
  min-width: 72px;
`;

const NeonEffect = keyframes`
  0% {
    box-shadow: 0 0 #0fb049;
  }
  100% {
    box-shadow: 0 0 6px 4px transparent;
  }
`;

const RedNeonEffect = keyframes`
0% {
  box-shadow: 0 0 #ff0000;
}
100% {
  box-shadow: 0 0 6px 4px transparent;
}
`;

const NeonSign = styled.div`
  margin-left: 2rem;
  border-radius: 50%;
  background: radial-gradient(#99ff99, #0fb049);
  width: 10px;
  height: 10px;
  text-align: center;
  position: relative;
  animation: ${NeonEffect} 2s ease infinite;
`;

const RedNeonSign = styled.div`
  margin-left: 2rem;
  border-radius: 50%;
  background: radial-gradient(#ff9999, #ff0000);
  width: 10px;
  height: 10px;
  text-align: center;
  position: relative;
  animation: ${RedNeonEffect} 2s ease infinite;
`;

const FieldBox = styled.div`
  display: flex;
  align-items: center;
`;

const SignupPage = props => {
  const {
    loading,
    signupSubmit,
    handleChange,
    classChange,
    questionChange,
    inputs,
    questionList,
    typeList,
    infoState,
    form
  } = props;

  if (loading) {
    return <LoadingCircle />;
  }

  return (
    <>
      <FormField autoComplete="on" onSubmit={signupSubmit}>
        <Welcome>회원가입</Welcome>
        <FieldBox>
          <FormTextField
            id="id"
            label="ID"
            value={form.id}
            onChange={handleChange}
          />
          {infoState.id ? <NeonSign /> : <RedNeonSign />}
        </FieldBox>
        <FieldBox>
          <FormTextField
            id="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
          {infoState.password ? <NeonSign /> : <RedNeonSign />}
        </FieldBox>
        <FieldBox>
          <FormTextField
            id="passwordCheck"
            label="PasswordCheck"
            type="password"
            value={form.passwordCheck}
            onChange={handleChange}
          />
          {infoState.passwordCheck ? <NeonSign /> : <RedNeonSign />}
        </FieldBox>
        <FieldBox>
          <FormTextField
            id="email"
            label="email"
            value={form.email}
            onChange={handleChange}
          />
          {infoState.email ? <NeonSign /> : <RedNeonSign />}
        </FieldBox>
        <FieldBox>
          <FormTextField
            id="name"
            label="이름"
            value={form.name}
            onChange={handleChange}
          />
          {infoState.name ? <NeonSign /> : <RedNeonSign />}
        </FieldBox>
        <FieldBox>
          <FormTextField
            id="nickname"
            label="닉네임"
            value={form.nickname}
            onChange={handleChange}
          />
          {infoState.nickname ? <NeonSign /> : <RedNeonSign />}
        </FieldBox>
        <FieldBox>
          <FormTextField
            id="phoneNumber"
            label="전화번호"
            helperText="-를 빼고 입력하세요"
            type="number"
            value={form.phoneNumber}
            onChange={handleChange}
          />
          {infoState.phoneNumber ? <NeonSign /> : <RedNeonSign />}
        </FieldBox>
        <FieldBox>
          <FormTextField
            id="studentId"
            label="학번"
            value={form.studentId}
            onChange={handleChange}
            type="number"
          />
          {infoState.studentId ? <NeonSign /> : <RedNeonSign />}
        </FieldBox>
        <FieldBox>
          <InputLabel id="demo-simple-select-label">나만의 질문</InputLabel>
          <FormSelectField
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={inputs.questionId}
            displayEmpty
            onChange={questionChange}
          >
            {questionList.map(question => (
              <MenuItem value={question.questionid} key={question.questionid}>
                {question.question}
              </MenuItem>
            ))}
          </FormSelectField>
        </FieldBox>
        <FieldBox>
          <FormTextField
            id="answer"
            label="질문 답"
            value={form.answer}
            onChange={handleChange}
          />
          {infoState.answer ? <NeonSign /> : <RedNeonSign />}
        </FieldBox>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          신분
        </InputLabel>
        <FormSelectField
          id="type"
          value={inputs.type}
          onChange={classChange}
          displayEmpty
        >
          {typeList.map(type => (
            <MenuItem value={type.userType} key={type.typeid}>
              {type.userType}
            </MenuItem>
          ))}
        </FormSelectField>
        {Object.values(infoState).includes(false) ? (
          <Button variant="contained" color="secondary">
            회원가입
          </Button>
        ) : (
          <Button variant="contained" color="primary" type="submit">
            회원가입
          </Button>
        )}
      </FormField>
    </>
  );
};

export default SignupPage;
