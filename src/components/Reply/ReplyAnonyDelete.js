import React from 'react';
import styled from 'styled-components';
import {
  DialogActions,
  Button,
  DialogContent,
  TextField
} from '@material-ui/core';
import { ReplyDeleteTemplate } from './ReplyDelete';

const FieldWrapper = styled(DialogContent)`
  &.MuiDialogContent-root:first-child {
    padding-top: 0px;
  }
`;

const ReplyAnonyDeleteAction = props => {
  const { handleClose } = props;

  return (
    <DialogActions>
      <Button type="submit" variant="contained" color="secondary" autoFocus>
        삭제
      </Button>
      <Button onClick={handleClose}>취소</Button>
    </DialogActions>
  );
};

const ReplyAnonyDeleteForm = props => {
  const { onSubmit, removeForm, handleChange, children } = props;

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
      {children}
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
    <ReplyDeleteTemplate
      open={open}
      loading={loading}
      error={error}
      handleOpen={handleOpen}
    >
      <ReplyAnonyDeleteForm
        onSubmit={onSubmit}
        removeForm={removeForm}
        handleChange={handleChange}
        handleClose={handleClose}
      >
        <ReplyAnonyDeleteAction handleClose={handleClose} />
      </ReplyAnonyDeleteForm>
    </ReplyDeleteTemplate>
  );
};

export default ReplyAnonyDelete;
