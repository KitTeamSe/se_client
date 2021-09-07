import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core';
import ActionButton from './ReplyActionButton';
import ActionLoading from '../Action/ActionLoading';
import { DialogErrorMessage } from '../Action/ErrorMessage';

const ReplyDeleteAction = props => {
  const { onDelete, handleClose } = props;

  return (
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
  );
};

const ReplyDeleteDialog = props => {
  const { open, loading, error, children } = props;

  return (
    <Dialog open={open} aria-labelledby="delete-dialog-title">
      <DialogTitle id="delete-dialog-title">
        댓글을 삭제하시겠습니까?
      </DialogTitle>
      <DialogErrorMessage loading={loading} error={error} />
      {children}
    </Dialog>
  );
};

export const ReplyDeleteTemplate = props => {
  const { open, loading, error, handleOpen, children } = props;

  return (
    <>
      <ActionButton onClick={handleOpen}>삭제</ActionButton>
      <ReplyDeleteDialog open={open} loading={loading} error={error}>
        {children}
      </ReplyDeleteDialog>
      <ActionLoading loading={loading} />
    </>
  );
};

const ReplyDelete = props => {
  const { loading, error, onDelete, open, handleOpen, handleClose } = props;

  return (
    <ReplyDeleteTemplate
      open={open}
      loading={loading}
      error={error}
      handleOpen={handleOpen}
    >
      <ReplyDeleteAction onDelete={onDelete} handleClose={handleClose} />
    </ReplyDeleteTemplate>
  );
};

export default ReplyDelete;
