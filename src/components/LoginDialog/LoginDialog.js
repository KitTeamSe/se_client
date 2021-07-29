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

  const ErrorMsg = styled.div`
    color: #ff5555;
    font-size: 12px;
    margin-top: 5px;
  `;

  const StyledDialogContent = styled(DialogContent)`
    height: 150px;
  `;

  const StyledDialogContentText = styled(DialogContentText)`
    font-size: 12px;
  `;

  const StyledButton = styled(Button)`
    width: 100%;
    padding: 14px 0;
    margin: 0px;
    text-align: center;
  `;

  const StyledButtonPositive = styled(Button)`
    width: 50%;
    padding: 14px 0;
    margin: 0px;
    text-align: center;
    background: #000;
    color: #fff;
  `;

  const StyledLink = styled(Link)`
    width: 50%;
    text-align: center;
    text-decoration: none;
    color: #666;
  `;

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
        <DialogTitle align="center">관리자 로그인</DialogTitle>
        <StyledDialogContent>
          {/* <DialogContentText>아이디 admin</DialogContentText> */}
          {/* <DialogContentText>비밀번호 se75407540</DialogContentText> */}
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
            label="PASSWORD"
            onChange={onChange}
            value={form.pw}
            type="password"
          />
          <ErrorMsg>{error}</ErrorMsg>
        </StyledDialogContent>
        <StyledDialogContentText align="center">
          아이디/비밀번호 찾기
        </StyledDialogContentText>
        <DialogActions>
          <StyledLink to="signup">
            <StyledButton onClick={handleClose}>회원가입</StyledButton>
          </StyledLink>
          <StyledButtonPositive onClick={onLogin}>로그인</StyledButtonPositive>
        </DialogActions>
      </Dialog>
    </span>
  );
};

export default LoginDialog;
