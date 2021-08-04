import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import styled from 'styled-components';

const AlignCenter = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormFlex = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormTextField = styled(TextField)`
  min-width: 280px;
  margin: 4px;
  margin="dense"
  variant="standard"
  fullWidth
  `;

const DialogContentFlex = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  padding-bottom: 0;
`;

const ErrorText = styled.div`
  margin: 6px;
  font-size: 18px;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FindButtonWrapper = styled.div`
  width: 100%;
  height: 36px;
  text-align: right;
`;

const FindLink = styled(Link)`
  padding: 0px 8px 8px 8px;
  margin-right: 12px;
  font-size: 14px;
  text-decoration: none;
  color: gray;
  text-align: right;
`;

const LoginButton = styled(Button)`
  border-radius: 24px;
  font-size: 16px;
  padding: 10px 0;
  margin: 0px 24px 12px 24px;
  background-image: linear-gradient(to left, #9980fa, #fda7df);
  color: white;
`;

const SignupLink = styled(Link)`
  padding: 14px 0;
  margin-bottom: 8px;
  text-decoration: none;
  color: black;
  align-items: center;
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
        <AlignCenter>
          <DialogTitle>SE 로그인</DialogTitle>
          <FormFlex onSubmit={onLogin}>
            <DialogContentFlex>
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
            </DialogContentFlex>
            <LinkWrapper>
              <FindButtonWrapper>
                <FindLink onClick={handleClose} to="find">
                  forgot?
                </FindLink>
              </FindButtonWrapper>
              <LoginButton type="submit">로그인</LoginButton>
              <SignupLink onClick={handleClose} to="signup">
                회원가입
              </SignupLink>
            </LinkWrapper>
          </FormFlex>
        </AlignCenter>
      </Dialog>
    </span>
  );
};

export default LoginDialog;
