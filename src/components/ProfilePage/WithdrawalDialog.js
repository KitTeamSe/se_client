import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button
} from '@material-ui/core';
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

const WithdrawalDialog = props => {
  const { mode, withDrawalForm, modeChange, formChange, withdrawalSubmit } =
    props;
  return (
    <>
      <Dialog
        open={mode === 'withdrawalMode'}
        onClose={modeChange}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">회원 탈퇴</DialogTitle>
        <DialogContent>
          <DialogContentText> 나 탈퇴한다~~~~~~~~~</DialogContentText>
        </DialogContent>
        <FormField submit={withdrawalSubmit}>
          <FormTextField
            autoFocus
            id="password"
            label="비밀번호를 입력하세요"
            type="password"
            onChange={formChange}
            value={withDrawalForm.password}
          />
          <FormTextField
            id="text"
            label="'탈퇴'를 입력하세요"
            type="text"
            onChange={formChange}
            value={withDrawalForm.text}
          />
          <ButtonWrapper>
            <HalfButton onClick={modeChange} color="primary">
              취소
            </HalfButton>
            <HalfButton
              type="submit"
              onClick={withdrawalSubmit}
              color="primary"
            >
              탈퇴
            </HalfButton>
          </ButtonWrapper>
        </FormField>
      </Dialog>
    </>
  );
};

export default WithdrawalDialog;
