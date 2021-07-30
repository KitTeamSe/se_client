import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import styled from 'styled-components';
import { initializeForm } from '../../modules/auth';

const FormTextField = styled(TextField)`
  margin: 4px;
  margin="dense"
  variant="standard"
  fullWidth
  `;

const ErrorText = styled.div`
  margin: 6px;
  font-size: 18px;
`;

const LoginDialog = props => {
  const { onLogin, onEnterPress, onChange, form, error } = props;
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
          <form onSubmit={onLogin}>
            <FormTextField
              autoFocus
              id="id"
              name="id"
              label="ID"
              value={form.id}
              type="id"
            />
            <FormTextField
              id="pw"
              name="pw"
              label="PW"
              onChange={onChange}
              onKeyPress={onEnterPress}
              value={form.pw}
              type="password"
            />
          </form>
          <ErrorText>{error}</ErrorText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={onLogin}>로그인</Button>
        </DialogActions>
        <Link onClick={handleClose} to="signup">
          회원가입
        </Link>
      </Dialog>
    </span>
  );
};

export default LoginDialog;
