import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

const LogoutDialog = props => {
  const { onLogout } = props;

  return (
    <>
      <IconWrapper>
        <LogoutIcon icon={faDoorOpen} size="2x" onClick={onLogout} />
        <Typo>로그아웃</Typo>
      </IconWrapper>
    </>
  );
};

export default LogoutDialog;
