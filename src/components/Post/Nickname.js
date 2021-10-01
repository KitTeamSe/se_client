import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import styled from 'styled-components';

const Nick = styled.span`
  cursor: pointer;
`;

const Nickname = props => {
  const { nickname, accountIdString, anchorEl, menuHandle, GoUserProfile } =
    props;

  const userId = localStorage.getItem('userId');

  if (!userId) {
    return <span>{nickname}</span>;
  }
  return (
    <>
      {accountIdString ? (
        <>
          <Nick onClick={menuHandle}>{nickname}</Nick>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={menuHandle}
            style={{ marginLeft: '2.5rem' }}
          >
            <MenuItem onClick={GoUserProfile}>회원 정보 보기</MenuItem>
          </Menu>
        </>
      ) : (
        <span>{nickname}</span>
      )}
    </>
  );
};

export default Nickname;
