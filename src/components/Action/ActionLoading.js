import React from 'react';
import styled from 'styled-components';
import { Backdrop, CircularProgress } from '@mui/material';

const BackdropStyled = styled(Backdrop)`
  z-index: 9999;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.03);
`;

const ActionLoading = props => {
  const { loading } = props;

  return (
    <BackdropStyled open={loading}>
      <CircularProgress color="inherit" />
    </BackdropStyled>
  );
};

export default ActionLoading;
