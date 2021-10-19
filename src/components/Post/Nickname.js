import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import styled from 'styled-components';

const AnonyNicknameSpan = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const NicknameSpan = styled(AnonyNicknameSpan)`
  cursor: pointer;
`;

const UserNickname = props => {
  const { nickname, anchorEl, menuHandle, GoUserProfile } = props;
  const userId = localStorage.getItem('userId');
  if (userId)
    return (
      <>
        <NicknameSpan onClick={menuHandle}>{nickname}</NicknameSpan>
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
    );
  return <NicknameSpan>{nickname}</NicknameSpan>;
};

const Nickname = props => {
  const { nickname, accountIdString, anchorEl, menuHandle, GoUserProfile } =
    props;

  if (accountIdString)
    return (
      <UserNickname
        nickname={nickname}
        anchorEl={anchorEl}
        menuHandle={menuHandle}
        GoUserProfile={GoUserProfile}
      />
    );
  return <AnonyNicknameSpan>{nickname}</AnonyNicknameSpan>;
};

export default Nickname;
