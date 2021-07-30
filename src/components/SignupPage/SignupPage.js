import React from 'react';
import styled from 'styled-components';
import {
  TextField,
  Select,
  InputLabel,
  MenuItem,
  Button
} from '@material-ui/core';

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
  variant="outlined"
`;

const FormSelectField = styled(Select)`
  margin: 6px;
  min-width: 72px;
`;

const ErrorText = styled.div`
  margin: 6px;
  font-size: 18px;
`;

const SignupPage = props => {
  const {
    error,
    signupSubmit,
    handleChange,
    classChange,
    questionChange,
    inputs,
    questionList,
    typeList
  } = props;

  return (
    <>
      <FormField autoComplete="on">
        <Welcome>회원가입</Welcome>
        <FormTextField id="id" label="ID" onChange={handleChange} />
        <FormTextField
          id="password"
          label="Password"
          type="password"
          onChange={handleChange}
        />
        <FormTextField
          id="passwordCheck"
          label="PasswordCheck"
          type="password"
          onChange={handleChange}
        />
        <FormTextField id="email" label="email" onChange={handleChange} />
        <FormTextField id="name" label="이름" onChange={handleChange} />
        <FormTextField id="nickname" label="닉네임" onChange={handleChange} />
        <FormTextField
          id="phoneNumber"
          label="전화번호"
          helperText="-를 빼고 입력하세요"
          type="number"
          onChange={handleChange}
        />
        <FormTextField
          id="studentId"
          label="학번"
          onChange={handleChange}
          type="number"
        />
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
        <FormTextField id="answer" label="질문 답" onChange={handleChange} />
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
        <ErrorText>{error}</ErrorText>
        <Button variant="contained" color="primary" onClick={signupSubmit}>
          회원가입
        </Button>
      </FormField>
    </>
  );
};

export default SignupPage;
