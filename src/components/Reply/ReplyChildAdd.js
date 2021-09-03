import React from 'react';
import styled from 'styled-components';
import {
  FormControlLabel,
  Switch,
  Input,
  Button,
  Tooltip
} from '@material-ui/core';
import Editor from '../Editor/Editor';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media ${props => props.theme.mobile} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const InputWrapper = styled.div`
  display: flex;
`;

const InputStyled = styled(Input)`
  width: 120px;
  height: 32px;
  margin-right: 5px;
  & input {
    font-size: 0.875rem;
    padding: 4px 0;
  }
`;

const FormControlLabelStyled = styled(FormControlLabel)`
  span {
    font-size: 0.75rem;
  }
`;

const ButtonWrapper = styled.div`
  @media ${props => props.theme.mobile} {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`;

const ButtonStyled = styled(Button)`
  font-weight: 500;
  line-height: 1.5;
  padding: 6px 12px;
  border-radius: 100px;
  margin-left: 10px;
`;

const SecretToggle = props => {
  const { onChange } = props;
  return (
    <Tooltip title="비밀글" aria-label="secret-child-add" place="bottom">
      <FormControlLabelStyled
        control={<Switch color="secondary" id="isSecret" onChange={onChange} />}
        labelPlacement="start"
        label="비밀글"
      />
    </Tooltip>
  );
};

const ReplyAdd = props => {
  const {
    addChildForm,
    handleChange,
    handleSecret,
    handleContentText,
    onFocus,
    onSubmit,
    onCancel
  } = props;

  return (
    <form onSubmit={onSubmit}>
      <Editor
        onChange={handleContentText}
        onFocus={onFocus}
        data={addChildForm.text}
        type="reply"
      />
      <Wrapper>
        <InputWrapper>
          {!localStorage.getItem('token') || !localStorage.getItem('userId') ? (
            <>
              <InputStyled
                placeholder="글쓴이"
                id="anonymousNickname"
                size="small"
                value={addChildForm.anonymousNickname}
                onChange={handleChange}
              />
              <InputStyled
                placeholder="비밀번호"
                id="anonymousPassword"
                type="password"
                value={addChildForm.anonymousPassword}
                onChange={handleChange}
              />
            </>
          ) : null}
          <SecretToggle onChange={handleSecret} />
        </InputWrapper>
        <ButtonWrapper>
          <ButtonStyled
            variant="outlined"
            color="default"
            size="small"
            onClick={onCancel}
          >
            취소
          </ButtonStyled>
          <ButtonStyled
            variant="contained"
            color="default"
            size="small"
            type="submit"
          >
            작성
          </ButtonStyled>
        </ButtonWrapper>
      </Wrapper>
    </form>
  );
};
export default ReplyAdd;