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
  transition: all 0.3s;
`;

const SignupHeader = styled.div`
  margin-top: 2rem;
  font-size: 1.5rem;
`;

const FormTextField = styled(TextField)`
  margin: 0.4rem;
  margin: dense;
`;

const FormSelectField = styled(Select)`
  margin: 0.8125rem;
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

const FieldBoxWraper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-bottom: 2rem;
`;

const FieldTemplate = props => {
  const { id, label, type, variant, value, helperText, onChange, infoState } =
    props;
  return (
    <FieldBox>
      <FormTextField
        id={id}
        label={label}
        type={type}
        variant={variant}
        helperText={helperText}
        value={value}
        onChange={onChange}
      />
      {infoState ? <GreenNeonSign /> : <RedNeonSign />}
    </FieldBox>
  );
};

const Signup = props => {
  const {
    loading,
    signupSubmit,
    handleChange,
    questionChange,
    inputs,
    questionList,
    infoState,
    form
  } = props;

  if (loading) {
    return <LoadingCircle />;
  }

  return (
    <FormField autoComplete="on" onSubmit={signupSubmit}>
      <SignupHeader>회원가입</SignupHeader>
      <FieldBoxWraper>
        <FieldTemplate
          id="id"
          label="ID"
          variant="standard"
          value={form.id}
          onChange={handleChange}
          infoState={infoState.id}
        />
        <FieldTemplate
          id="password"
          label="Password"
          type="password"
          variant="standard"
          value={form.password}
          onChange={handleChange}
          infoState={infoState.password}
        />
        <FieldTemplate
          id="passwordCheck"
          label="PasswordCheck"
          type="password"
          variant="standard"
          value={form.passwordCheck}
          onChange={handleChange}
          infoState={infoState.passwordCheck}
        />
        <FieldTemplate
          id="nickname"
          label="닉네임"
          variant="standard"
          value={form.nickname}
          onChange={handleChange}
          infoState={infoState.nickname}
        />
      </FieldBoxWraper>
      <FieldBoxWraper>
        <FieldTemplate
          id="name"
          label="이름"
          variant="standard"
          value={form.name}
          onChange={handleChange}
          infoState={infoState.name}
        />
        <FieldTemplate
          id="email"
          label="email"
          variant="standard"
          value={form.email}
          onChange={handleChange}
          infoState={infoState.email}
        />
        <FieldTemplate
          id="phoneNumber"
          label="전화번호"
          variant="standard"
          helperText="-를 빼고 입력하세요"
          type="number"
          value={form.phoneNumber}
          onChange={handleChange}
          infoState={infoState.phoneNumber}
        />
        <FieldTemplate
          id="studentId"
          label="학번"
          type="number"
          variant="standard"
          value={form.studentId}
          onChange={handleChange}
          infoState={infoState.studentId}
        />
      </FieldBoxWraper>
      <FieldBoxWraper>
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
        <FieldTemplate
          id="answer"
          label="질문 답"
          variant="standard"
          value={form.answer}
          onChange={handleChange}
          infoState={infoState.answer}
        />
      </FieldBoxWraper>
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
  );
};

export default Signup;
