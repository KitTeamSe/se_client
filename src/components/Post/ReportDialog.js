import React from 'react';
import styled from 'styled-components';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 20rem;
  margin-top: 1rem;
`;

const ReportDialog = props => {
  const {
    reportOpen,
    reportBoxHandle,
    reportSubmit,
    reportDescription,
    descriptionChange,
    reportType,
    targetName
  } = props;
  return (
    <Dialog
      open={reportOpen}
      onClose={reportBoxHandle}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {targetName} 님의 {reportType === 'POST' ? '게시글' : '댓글'} 신고
      </DialogTitle>
      <DialogContent>
        <FlexBox>
          <TextField
            id="outlined-multiline-static"
            label="신고내용"
            multiline
            minRows={6}
            value={reportDescription}
            onChange={descriptionChange}
          />
        </FlexBox>
      </DialogContent>
      <DialogActions>
        <Button onClick={reportBoxHandle} color="primary">
          취소
        </Button>
        {reportDescription.length > 4 ? (
          <Button onClick={reportSubmit} color="error">
            신고
          </Button>
        ) : (
          <Button disabled>신고</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ReportDialog;
