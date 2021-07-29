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

const Welcome = styled.div`
  margin: 24px;
  font-size: 24px;
`;

const FormTextField = styled(TextField)`
  margin: 4px;
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
        <Welcome>회원가입</Welcome>
        <FormTextField
          margin="dense"
          required
          id="id"
          label="ID"
          variant="outlined"
          onChange={handleChange}
        />
        <FormTextField
          margin="dense"
          required
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          onChange={handleChange}
        />
        <FormTextField
          margin="dense"
          required
          id="passwordCheck"
          label="PasswordCheck"
          type="password"
          variant="outlined"
          onChange={handleChange}
        />
        <FormTextField
          margin="dense"
          required
          id="email"
          label="email"
          variant="outlined"
          onChange={handleChange}
        />
        <FormTextField
          margin="dense"
          required
          id="name"
          label="이름"
          variant="outlined"
          onChange={handleChange}
        />
        <FormTextField
          margin="dense"
          id="nickname"
          label="닉네임"
          helperText="미입력시 익명입니다"
          variant="outlined"
          onChange={handleChange}
        />
        <FormTextField
          margin="dense"
          id="phoneNumber"
          label="전화번호"
          helperText="-를 빼고 입력하세요"
          variant="outlined"
          type="number"
          onChange={handleChange}
        />
        <FormTextField
          margin="dense"
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
          <MenuItem value={1}>다른 이메일 주소는?</MenuItem>
          <MenuItem value={2}>나의 보물 1호는?</MenuItem>
          <MenuItem value={3}>나의 출신 초등학교는?</MenuItem>
          <MenuItem value={4}>나의 출신 고향은?</MenuItem>
          <MenuItem value={5}>나의 이상형은?</MenuItem>
          <MenuItem value={6}>어머니 성함은?</MenuItem>
          <MenuItem value={7}>아버지 성함은?</MenuItem>
          <MenuItem value={8}>가장 좋아하는 색깔은?</MenuItem>
          <MenuItem value={9}>가장 좋아하는 음식은?</MenuItem>
        </FormSelectField>
        <FormTextField
          margin="dense"
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
        <div>{error}</div>
        <Button variant="contained" color="primary" onClick={signupSubmit}>
          회원가입
        </Button>
      </FormField>
    </>
  );
};

export default SignupPage;
