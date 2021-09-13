import React from 'react';
import styled from 'styled-components';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem
} from '@material-ui/core';
import { reportType } from '../../DataExport';

const FormSelectField = styled(Select)`
  margin: 1.5rem 0;
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const PostReportDialog = props => {
  const {
    reportOpen,
    reportBoxHandle,
    reportSubmit,
    reportDescription,
    descriptionChange,
    reportTypeSelect,
    reportTypeChange
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
          <FormSelectField
            name="editType"
            id="form1"
            value={reportTypeSelect}
            onChange={reportTypeChange}
          >
            {reportType.map(menu => (
              <MenuItem value={menu} key={menu}>
                {menu}
              </MenuItem>
            ))}
          </FormSelectField>
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

export default PostReportDialog;
