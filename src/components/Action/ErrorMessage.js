import React from 'react';
import styled from 'styled-components';
import { DialogContentText, Typography } from '@mui/material';

const DialogMessage = styled(DialogContentText)`
  width: 100%;
  text-align: center;
  color: #dc004e;
`;

const Message = styled(Typography)`
  width: 100%;
  text-align: right;
  color: #dc004e;
`;

export const DialogErrorMessage = props => {
  const { loading, error } = props;

  return (
    !loading &&
    error && (
      <>
        <DialogMessage>[Error]</DialogMessage>
        <DialogMessage>{error.message}</DialogMessage>
      </>
    )
  );
};

export const StateErrorMessage = props => {
  const { loading = false, error } = props;

  return !loading && error && <Message>{error}</Message>;
};

const ErrorMessage = props => {
  const { loading, error } = props;

  return !loading && error && <Message>{error.message}</Message>;
};

export default ErrorMessage;
