import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

const DeleteAlertDialog = props => {
  const { deleteBoxOpen, deleteBoxHandle, deleteFunction } = props;
  return (
    <Dialog
      open={deleteBoxOpen}
      onClose={deleteBoxHandle}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">삭제</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          게시글을 삭제하시겠습니까? 복구되지 않습니다
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={deleteBoxHandle} color="primary">
          취소
        </Button>
        <Button onClick={deleteFunction} color="secondary">
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAlertDialog;
