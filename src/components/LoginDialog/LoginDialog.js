import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons';
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
  const { onLogin, handleClickOpen, handleClose, open, onChange, form, error } =
    props;

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
        <DialogTitle>SE 로그인</DialogTitle>
        <form onSubmit={onLogin}>
          <DialogContent>
            <DialogContentText>
              SE Board 입니다!! 회원가입이 안되있으면 가입해주세요
            </DialogContentText>
            <FormTextField
              autoFocus
              id="id"
              name="id"
              label="ID"
              onChange={onChange}
              value={form.id}
              type="id"
            />
            <FormTextField
              id="pw"
              name="pw"
              label="PW"
              onChange={onChange}
              value={form.pw}
              type="password"
            />
            <ErrorText>{error}</ErrorText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>취소</Button>
            <Button type="submit">로그인</Button>
          </DialogActions>
        </form>
        <Link onClick={handleClose} to="signup">
          회원가입
        </Link>
      </Dialog>
    </span>
  );
};

export default LoginDialog;
