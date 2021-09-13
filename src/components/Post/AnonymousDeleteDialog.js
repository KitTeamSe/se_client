import React from 'react';
import styled from 'styled-components';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@material-ui/core';

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

const AnonymousDeleteDialog = props => {
  const {
    anonymousDeleteBoxOpen,
    anonymousDeleteBoxHandle,
    anonymousDeleteFunction,
    anonyPwChange,
    anonymousPassword
  } = props;
  return (
    <Dialog
      open={anonymousDeleteBoxOpen}
      onClose={anonymousDeleteBoxHandle}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">게시글 삭제</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          비밀번호를 입력하세요
        </DialogContentText>
      </DialogContent>
      <FormField onSubmit={anonymousDeleteFunction}>
        <FormTextField
          autoFocus
          id="nowPassword"
          label="비밀번호를 입력하세요"
          type="password"
          onChange={anonyPwChange}
          value={anonymousPassword}
        />
      </FormField>
      <DialogActions>
        <Button onClick={anonymousDeleteBoxHandle} color="primary">
          취소
        </Button>
        <Button onClick={anonymousDeleteFunction} color="secondary">
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AnonymousDeleteDialog;
