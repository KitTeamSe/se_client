import React from 'react';
import styled, { keyframes } from 'styled-components';
import {
  TextField,
  Select,
  InputLabel,
  MenuItem,
  Button,
  CircularProgress
} from '@mui/material';

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
  margin-top: 1.5rem;
  font-size: 1.5rem;
`;

const FormTextField = styled(TextField)`
  margin: 0.4rem;
  margin="dense"
`;

const FormSelectField = styled(Select)`
  margin: 0.8rem;
  min-width: 6rem;
`;

const GreenNeonEffect = keyframes`
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
  box-shadow: 0 0 8px 6px transparent;
}
`;

const GreenNeonSign = styled.div`
  margin: 1rem 0 0 1rem;
  border-radius: 50%;
  background: radial-gradient(#99ff99, #0fb049);
  width: 10px;
  height: 10px;
  text-align: center;
  position: relative;
  animation: ${GreenNeonEffect} 2s ease infinite;
`;

const RedNeonSign = styled.div`
  margin: 1rem 0 0 1rem;
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

const SelectFieldBox = styled(FieldBox)`
  margin-top: 0.5rem;
`;

const SignupButton = styled(Button)`
  margin-top: 1rem;
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
            variant="standard"
            value={form.id}
            onChange={handleChange}
          />
          {infoState.id ? <GreenNeonSign /> : <RedNeonSign />}
        </FieldBox>
        <FieldBox>
          <FormTextField
            id="password"
            label="Password"
            type="password"
            variant="standard"
            value={form.password}
            onChange={handleChange}
          />
          {infoState.password ? <GreenNeonSign /> : <RedNeonSign />}
        </FieldBox>
        <FieldBox>
          <FormTextField
            id="passwordCheck"
            label="PasswordCheck"
            type="password"
            variant="standard"
            value={form.passwordCheck}
            onChange={handleChange}
          />
          {infoState.passwordCheck ? <GreenNeonSign /> : <RedNeonSign />}
        </FieldBox>
        <FieldBox>
          <FormTextField
            id="email"
            label="email"
            variant="standard"
            value={form.email}
            onChange={handleChange}
          />
          {infoState.email ? <GreenNeonSign /> : <RedNeonSign />}
        </FieldBox>
        <FieldBox>
          <FormTextField
            id="name"
            label="이름"
            variant="standard"
            value={form.name}
            onChange={handleChange}
          />
          {infoState.name ? <GreenNeonSign /> : <RedNeonSign />}
        </FieldBox>
        <FieldBox>
          <FormTextField
            id="nickname"
            label="닉네임"
            variant="standard"
            value={form.nickname}
            onChange={handleChange}
          />
          {infoState.nickname ? <GreenNeonSign /> : <RedNeonSign />}
        </FieldBox>
        <FieldBox>
          <FormTextField
            id="phoneNumber"
            label="전화번호"
            variant="standard"
            helperText="-를 빼고 입력하세요"
            type="number"
            value={form.phoneNumber}
            onChange={handleChange}
          />
          {infoState.phoneNumber ? <GreenNeonSign /> : <RedNeonSign />}
        </FieldBox>
        <FieldBox>
          <FormTextField
            id="studentId"
            label="학번"
            variant="standard"
            value={form.studentId}
            onChange={handleChange}
            type="number"
          />
          {infoState.studentId ? <GreenNeonSign /> : <RedNeonSign />}
        </FieldBox>
        <SelectFieldBox>
          <InputLabel id="demo-simple-select-label">나만의 질문</InputLabel>
          <FormSelectField
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            variant="standard"
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
        </SelectFieldBox>
        <FieldBox>
          <FormTextField
            id="answer"
            label="질문 답"
            variant="standard"
            value={form.answer}
            onChange={handleChange}
          />
          {infoState.answer ? <GreenNeonSign /> : <RedNeonSign />}
        </FieldBox>
        <SelectFieldBox>
          <InputLabel id="demo-simple-select-placeholder-label-label">
            신분
          </InputLabel>
          <FormSelectField
            id="type"
            variant="standard"
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
        </SelectFieldBox>
        {Object.values(infoState).includes(false) ? (
          <SignupButton variant="outlined" disabled>
            회원가입
          </SignupButton>
        ) : (
          <SignupButton variant="contained" color="primary" type="submit">
            회원가입
          </SignupButton>
        )}
      </FormField>
    </>
  );
};

export default SignupPage;
