import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const FormField = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const FormTextField = styled(TextField)`
  margin: 6px;
`;

const FormSelectField = styled(Select)`
  margin: 6px;
  min-width: 72px;
`;

const SignupPage = props => {
  const {
    error,
    signupSubmit,
    handleChange,
    classChange,
    questionChange,
    inputs
  } = props;

  return (
    <>
      <FormField autoComplete="on">
        <FormTextField
          required
          id="id"
          label="ID"
          variant="outlined"
          onChange={handleChange}
        />
        <FormTextField
          required
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          onChange={handleChange}
        />
        <FormTextField
          required
          id="passwordCheck"
          label="passwordCheck"
          type="password"
          variant="outlined"
          onChange={handleChange}
        />
        <FormTextField
          required
          id="email"
          label="email"
          variant="outlined"
          onChange={handleChange}
        />
        <FormTextField
          required
          id="name"
          label="이름"
          variant="outlined"
          onChange={handleChange}
        />
        <FormTextField
          id="nickname"
          label="닉네임"
          helperText="미입력시 익명입니다"
          variant="outlined"
          onChange={handleChange}
        />
        <FormTextField
          id="phoneNumber"
          label="전화번호"
          helperText="-를 빼고 입력하세요"
          variant="outlined"
          type="number"
          onChange={handleChange}
        />
        <FormTextField
          id="studentId"
          label="학번"
          variant="outlined"
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
          <MenuItem value={1}>고향은?</MenuItem>
          <MenuItem value={2}>졸업한 초등학교는?</MenuItem>
          <MenuItem value={3}>첫사랑 이름은?</MenuItem>
        </FormSelectField>
        <FormTextField
          id="answer"
          label="질문 답"
          variant="outlined"
          onChange={handleChange}
        />
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          신분
        </InputLabel>
        <FormSelectField
          id="type"
          value={inputs.type}
          onChange={classChange}
          displayEmpty
        >
          <MenuItem value="STUDENT">학생</MenuItem>
          <MenuItem value="교수">교수</MenuItem>
          <MenuItem value="조교">조교</MenuItem>
        </FormSelectField>
      </FormField>
      <div>{error}</div>
      <Button variant="contained" color="primary" onClick={signupSubmit}>
        Primary
      </Button>
    </>
  );
};

export default SignupPage;
