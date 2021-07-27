import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const SignupPage = () => {
  const [age, setAge] = React.useState('');
  const handleChange = event => {
    setAge(event.target.value);
  };
  return (
    <form autoComplete="on">
      <div>
        <TextField required id="id_input" label="ID" variant="outlined" />
      </div>
      <div>
        <TextField
          required
          id="password_input"
          label="Password"
          type="password"
          variant="outlined"
        />
      </div>
      <div>
        <TextField required id="email" label="email" variant="outlined" />
      </div>
      <div>
        <TextField required id="name" label="이름" variant="outlined" />
      </div>
      <div>
        <TextField
          id="nickname"
          label="닉네임"
          helperText="미입력시 익명입니다"
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          id="phone_number"
          label="전화번호"
          helperText="-를 빼고 입력하세요"
          variant="outlined"
        />
      </div>
      <div>
        <TextField id="outlined-student_id" label="학번" variant="outlined" />
      </div>
      <div>
        <InputLabel id="demo-simple-select-label">나만의 질문</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={1}>고향은?</MenuItem>
          <MenuItem value={2}>졸업한 초등학교는?</MenuItem>
          <MenuItem value={3}>첫사랑 이름은?</MenuItem>
        </Select>
      </div>
      <div>
        <TextField id="question_answer" label="질문 답" variant="outlined" />
      </div>
      <div>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          신분
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={age}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value="">학생</MenuItem>
          <MenuItem value={2}>교수</MenuItem>
          <MenuItem value={3}>조교</MenuItem>
        </Select>
      </div>
    </form>
  );
};

export default SignupPage;
