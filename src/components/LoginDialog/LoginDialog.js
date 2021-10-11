import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {
  CircularProgress,
  TextField,
  Dialog,
  DialogTitle
} from '@mui/material';
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
  padding: 12px 24px 0px 24px;
`;

const FormTextField = styled(TextField)`
  min-width: 280px;
  margin: 4px;
  margin="dense"
  variant="standard"
  fullWidth
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
  margin-bottom: 4px;
`;

const FindLink = styled(Link)`
  padding: 0px 8px 8px 8px;
  margin-right: 12px;
  font-size: 14px;
  text-decoration: none;
  color: gray;
  text-align: right;
`;

const LoginButton = styled.button`
  border-radius: 24px;
  font-size: 16px;
  padding: 10px 0;
  margin: 0px 24px 12px 24px;
  background-image: linear-gradient(to right, #00d2ff 0%, #3a7bd5 100%);
  color: white;
  border: none;
  cursor: pointer;
  transition: 0.5s;
  font-weight: 400;
  &:hover {
    background-position: right;
    transition: 0.5s;
  }
`;

const SignupLink = styled(Link)`
  padding: 14px 0;
  margin-bottom: 8px;
  text-decoration: none;
  color: black;
  align-items: center;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    display: none;
  }
`;

const LoginIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  type="submit";
`;

const Typo = styled.p`
  text-align: center;
  align-items: bottom;
  font-size: 13px;
  margin-top: 4px;
`;

const LoadingCircle = styled(CircularProgress)`
  position: fixed;
  top: 45vh;
  right: 50vw;
`;

const LoginDialog = props => {
  const {
    onLogin,
    handleClickOpen,
    handleClose,
    open,
    onChange,
    form,
    error,
    loading
  } = props;

  return (
    <>
      <IconWrapper onClick={handleClickOpen}>
        <LoginIcon icon={faDoorClosed} size="2x" />
        <Typo>로그인</Typo>
      </IconWrapper>
      <Dialog open={open} onClose={handleClose}>
        <AlignCenter>
          {loading === true && <LoadingCircle />}
          <DialogTitle>SE 로그인</DialogTitle>
          <FormFlex onSubmit={onLogin}>
            <FormTextField
              autoFocus
              id="id"
              name="id"
              label="ID"
              variant="standard"
              onChange={onChange}
              value={form.id}
              type="id"
            />
            <FormTextField
              id="password"
              name="pw"
              label="PW"
              variant="standard"
              onChange={onChange}
              value={form.pw}
              type="password"
            />
            <ErrorText>{error}</ErrorText>
            <LinkWrapper>
              <FindButtonWrapper>
                <FindLink onClick={handleClose} to="/forgot">
                  forgot?
                </FindLink>
              </FindButtonWrapper>
              <LoginButton type="submit">로그인</LoginButton>
              <SignupLink onClick={handleClose} to="/signup">
                회원가입
              </SignupLink>
            </LinkWrapper>
          </FormFlex>
        </AlignCenter>
      </Dialog>
    </>
  );
};

export default LoginDialog;
