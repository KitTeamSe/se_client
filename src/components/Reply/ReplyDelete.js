import React from 'react';
import styled from 'styled-components';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Backdrop,
  CircularProgress,
  DialogContentText
} from '@material-ui/core';

import ActionButton from './ReplyActionButton';

const BackdropStyled = styled(Backdrop)`
  z-index: 9999;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.03);
`;

const ErrorMessage = styled(DialogContentText)`
  width: 100%;
  text-align: center;
  color: #dc004e;
`;

const ReplyDelete = props => {
  const { loading, error, onDelete, open, handleOpen, handleClose } = props;
  return (
    <>
      <ActionButton onClick={handleOpen}>삭제</ActionButton>
      <Dialog open={open} aria-labelledby="delete-dialog-title">
        <DialogTitle id="delete-dialog-title">
          댓글을 삭제하시겠습니까?
        </DialogTitle>

        <ErrorMessage>{!loading && error && '[Error]'}</ErrorMessage>
        <ErrorMessage>{!loading && error && error.message}</ErrorMessage>

        <DialogActions>
          <Button
            onClick={onDelete}
            variant="contained"
            color="secondary"
            autoFocus
          >
            삭제
          </Button>
          <Button onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
      <BackdropStyled open={loading}>
        <CircularProgress color="inherit" />
      </BackdropStyled>
    </>
  );
};

export default ReplyDelete;
