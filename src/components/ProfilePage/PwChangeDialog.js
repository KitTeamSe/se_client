import React from 'react';
import { Dialog, DialogTitle, TextField, Button } from '@material-ui/core';
import styled from 'styled-components';

const FormField = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const FormTextField = styled(TextField)`
  margin: 12px 32px 12px 32px;
  min-width: 256px;
`;

const ErrorText = styled.div`
  margin: 6px;
  font-size: 18px;
  color: red;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const HalfButton = styled(Button)`
  width: 50%;
  padding: 8px;
  margin: 8px;
`;

const PwChangeDialog = props => {
  const { mode, error, newPwForm, modeChange, pwChangeSubmit, formChange } =
    props;
  return (
    <>
      <Dialog
        open={mode === 'pwChangeMode'}
        onClose={modeChange}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">비밀번호 변경</DialogTitle>
        <FormField onSubmit={pwChangeSubmit}>
          <FormTextField
            autoFocus
            id="nowPassword"
            label="현재 비밀번호를 입력하세요"
            type="password"
            onChange={formChange}
            value={newPwForm.nowPassword}
          />
          <FormTextField
            id="newPassword"
            label="새로운 비밀번호"
            type="password"
            onChange={formChange}
            value={newPwForm.newPassword}
          />
          <FormTextField
            id="newPasswordConfirm"
            label="새로운 비밀번호 확인"
            type="password"
            onChange={formChange}
            value={newPwForm.newPasswordConfirm}
          />
          <ErrorText>{error}</ErrorText>
          <ButtonWrapper>
            <HalfButton onClick={modeChange} color="primary">
              취소
            </HalfButton>
            <HalfButton type="submit" onClick={pwChangeSubmit} color="primary">
              변경하기
            </HalfButton>
          </ButtonWrapper>
        </FormField>
      </Dialog>
    </>
  );
};

export default PwChangeDialog;
