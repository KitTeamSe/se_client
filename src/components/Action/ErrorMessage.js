import React from 'react';
import styled from 'styled-components';
import { DialogContentText, Typography } from '@material-ui/core';

const DialogMessage = styled(DialogContentText)`
  width: 100%;
  text-align: center;
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

const ErrorMessage = props => {
  const { loading, error } = props;

  return !loading && error && <Typography>{error.message}</Typography>;
};

export default ErrorMessage;
