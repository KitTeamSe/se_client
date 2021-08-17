import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen, faUser } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2px;
  padding: 2px;
  align-items: center;
`;

const Typo = styled.p`
  text-align: center;
  align-items: bottom;
  font-size: 13px;
  margin-top: 4px;
`;

const LogoutIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  type="submit";
`;

const ProfileIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

const LogoutDialog = props => {
  const { onLogout, ProfileClick } = props;

  return (
    <>
      <IconWrapper>
        <ProfileIcon onClick={ProfileClick} icon={faUser} size="2x" />
        <Typo>프로필</Typo>
      </IconWrapper>
      <IconWrapper>
        <LogoutIcon icon={faDoorOpen} size="2x" onClick={onLogout} />
        <Typo>로그아웃</Typo>
      </IconWrapper>
    </>
  );
};

export default LogoutDialog;
