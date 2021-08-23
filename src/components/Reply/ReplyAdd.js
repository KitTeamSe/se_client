import React from 'react';
import styled from 'styled-components';
import { Switch, FormControlLabel, Input, Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import Editor from '../Editor/Editor';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputStyled = styled(Input)`
  width: 160px;
  height: 32px;
  margin-right: 5px;
  & input {
    font-size: 0.875rem;
    padding: 4px 0;
  }
`;

const FormControlLabelStyled = styled(FormControlLabel)`
  & span {
    font-size: 0.875rem;
  }
`;

const ButtonStyled = styled(Button)`
  border-radius: 50px;
`;

const SecretToggle = props => {
  const { onChange } = props;
  return (
    <FormControlLabelStyled
      control={<Switch color="secondary" id="isSecret" onChange={onChange} />}
      labelPlacement="start"
      label="비밀글"
      size="small"
      margin="dense"
    />
  );
};

const ReplyAdd = props => {
  const {
    addForm,
    handleChange,
    handleSecret,
    handleContentText,
    onFocus,
    onSubmit
  } = props;

  return (
    <form onSubmit={onSubmit}>
      <Editor
        onChange={handleContentText}
        onFocus={onFocus}
        data={addForm.text}
        type="reply"
      />
      <Wrapper>
        <div>
          {!localStorage.getItem('token') || !localStorage.getItem('userId') ? (
            <>
              <InputStyled
                placeholder="글쓴이"
                id="anonymousNickname"
                size="small"
                value={addForm.anonymousNickname}
                onChange={handleChange}
              />
              <InputStyled
                placeholder="비밀번호"
                id="anonymousPassword"
                type="password"
                value={addForm.anonymousPassword}
                onChange={handleChange}
              />
            </>
          ) : null}
          <SecretToggle onChange={handleSecret} />
        </div>
        <div>
          <ButtonStyled
            variant="contained"
            color="default"
            size="small"
            type="submit"
            endIcon={<FontAwesomeIcon icon={faReply} />}
          >
            댓글 작성
          </ButtonStyled>
        </div>
      </Wrapper>
    </form>
  );
};
export default ReplyAdd;
