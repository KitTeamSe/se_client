import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import { initializeForm } from '../../modules/auth';

const LoginDialog = props => {
  const { onLogin, onChange, form, error } = props;
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(initializeForm('signin'));
  };

  return (
    <span>
      <FontAwesomeIcon
        icon={faDoorClosed}
        size="3x"
        type="submit"
        onClick={handleClickOpen}
        style={{ cursor: 'pointer' }}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>관리자 로그인</DialogTitle>
        <DialogContent>
          <DialogContentText>아이디 admin</DialogContentText>
          <DialogContentText>비밀번호 se75407540</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
            id="id"
            name="id"
            label="ID"
            onChange={onChange}
            value={form.id}
            type="id"
          />
          <TextField
            margin="dense"
            fullWidth
            variant="standard"
            id="pw"
            name="pw"
            label="PW"
            onChange={onChange}
            value={form.pw}
            type="password"
          />
          <div>{error}</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={onLogin}>로그인</Button>
        </DialogActions>
      </Dialog>
    </span>
  );
};

export default LoginDialog;
