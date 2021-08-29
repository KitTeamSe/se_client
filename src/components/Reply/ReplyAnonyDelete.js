import React from 'react';
import styled from 'styled-components';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Backdrop,
  CircularProgress,
  DialogContent,
  DialogContentText,
  TextField
} from '@material-ui/core';

const ButtonStyled = styled.button`
  padding: 0;
  margin-right: 10px;
  color: #999999;
  background: none;
  font-size: 0.8125rem;
  border: none;
  border-radius: 0;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    color: #666666;
  }
`;

const FieldWrapper = styled(DialogContent)`
  &.MuiDialogContent-root:first-child {
    padding-top: 0px;
  }
`;

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

const DeleteForm = props => {
  const { onSubmit, removeForm, handleChange, loading, error, handleClose } =
    props;

  return (
    <form onSubmit={onSubmit}>
      <FieldWrapper>
        <TextField
          autoFocus
          id="password"
          label="password"
          type="password"
          value={removeForm.password}
          onChange={handleChange}
          fullWidth
        />
      </FieldWrapper>

      <ErrorMessage>{!loading && error && '[Error]'}</ErrorMessage>
      <ErrorMessage>{!loading && error && error.message}</ErrorMessage>

      <DialogActions>
        <Button type="submit" variant="contained" color="secondary" autoFocus>
          삭제
        </Button>
        <Button onClick={handleClose}>취소</Button>
      </DialogActions>
    </form>
  );
};

const ReplyAnonyDelete = props => {
  const {
    removeForm,
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
      <ButtonStyled onClick={handleOpen}>삭제</ButtonStyled>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">
          댓글을 삭제하시겠습니까?
        </DialogTitle>
        <DeleteForm
          onSubmit={onSubmit}
          removeForm={removeForm}
          handleChange={handleChange}
          loading={loading}
          error={error}
          handleClose={handleClose}
        />
      </Dialog>
      <BackdropStyled open={loading}>
        <CircularProgress color="inherit" />
      </BackdropStyled>
    </>
  );
};

export default ReplyAnonyDelete;
