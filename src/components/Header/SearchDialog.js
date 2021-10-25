import { Dialog, DialogContent } from '@mui/material';
import styled from 'styled-components';
import React from 'react';
import BoardSearch from '../Board/BoardSearch';

const DialogContentStyled = styled(DialogContent)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SearchDialog = props => {
  const { open, handleClose } = props;
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContentStyled>
        <BoardSearch />
      </DialogContentStyled>
    </Dialog>
  );
};

export default SearchDialog;
