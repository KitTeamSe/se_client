import React from 'react';
import styled from 'styled-components';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core';

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const ReportDialog = props => {
  const {
    reportOpen,
    reportBoxHandle,
    reportSubmit,
    reportDescription,
    descriptionChange
  } = props;
  return (
    <Dialog
      open={reportOpen}
      onClose={reportOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">신고</DialogTitle>
      <DialogContent>
        <FlexBox>
          <TextField
            id="outlined-multiline-static"
            label="신고내용"
            multiline
            rows={4}
            variant="outlined"
            value={reportDescription}
            onChange={descriptionChange}
          />
        </FlexBox>
      </DialogContent>
      <DialogActions>
        <Button onClick={reportBoxHandle} color="primary">
          취소
        </Button>
        <Button onClick={reportSubmit} color="secondary">
          신고
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReportDialog;
