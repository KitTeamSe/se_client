import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import styled from 'styled-components';
import React from 'react';
import BoardSearch from '../Board/BoardSearch';

const DialogContentStyled = styled(DialogContent)`
  display: flex;
  flex-direction: row;
  flex-direction: column;
  align-items: stretch;
`;

const BoardSearchDialog = props => {
  const { open, handleClose } = props;
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>검색</DialogTitle>
      <DialogContentStyled>
        <BoardSearch />
      </DialogContentStyled>
    </Dialog>
  );
};

export default BoardSearchDialog;
