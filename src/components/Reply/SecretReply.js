import React from 'react';
import styled from 'styled-components';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  TextField
} from '@material-ui/core';
import ReplyActionButton from './ReplyActionButton';
import ActionLoading from '../Action/ActionLoading';
import { DialogErrorMessage } from '../Action/ErrorMessage';

const FieldWrapper = styled(DialogContent)`
  &.MuiDialogContent-root:first-child {
    padding-top: 0px;
  }
`;

const SecretReplyAction = props => {
  const { handleClose } = props;
  return (
    <DialogActions>
      <Button type="submit" variant="contained" color="secondary" autoFocus>
        확인
      </Button>
      <Button onClick={handleClose}>취소</Button>
    </DialogActions>
  );
};

const SecretReplyForm = props => {
  const {
    onSubmit,
    loadSecretForm,
    handleChange,
    loading,
    error,
    handleClose
  } = props;

  return (
    <form onSubmit={onSubmit}>
      <FieldWrapper>
        <TextField
          autoFocus
          id="password"
          label="password"
          type="password"
          value={loadSecretForm.password}
          onChange={handleChange}
          fullWidth
        />
      </FieldWrapper>
      <DialogErrorMessage loading={loading} error={error} />
      <SecretReplyAction handleClose={handleClose} />
    </form>
  );
};

const SecretCheckDialog = props => {
  const { open, handleClose, children } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="secret-dialog-title"
    >
      <DialogTitle id="secret-dialog-title">
        비밀 댓글을 확인하시겠습니까?
      </DialogTitle>
      {children}
    </Dialog>
  );
};

const SecretReply = props => {
  const {
    loadSecretForm,
    loading,
    error,
    onSubmit,
    open,
    handleChange,
    handleOpen,
    handleClose
  } = props;
  return (
    <>
      <ReplyActionButton onClick={handleOpen}>비밀글확인</ReplyActionButton>
      <SecretCheckDialog open={open} onClose={handleClose}>
        <SecretReplyForm
          loading={loading}
          error={error}
          loadSecretForm={loadSecretForm}
          onSubmit={onSubmit}
          handleChange={handleChange}
          handleClose={handleClose}
        />
      </SecretCheckDialog>
      <ActionLoading loading={loading} />
    </>
  );
};

export default SecretReply;
