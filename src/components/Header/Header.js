import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { TextField } from '@material-ui/core';
import LoginDialogContainer from '../../containers/LoginDialog/LoginDialogContainer';

const HeaderWraper = styled.div`
  width: 100%;
  height: 96px;
  align-items: center;
  position: fixed;
  display: flex;
  justify-content: space-between;
  background-color: skyblue;
`;

const NavigationWrapper = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`;

const LogoWrapper = styled.div`
  width: 196px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
`;

const MenuWrapper = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
`;

const MenuItem = styled.a`
  text-decoreation: none;
  color: black;
  padding: 8px 12px;
  cursor: pointer;
`;

const SearchBar = styled.div`
  width: 196px;
  border: 1px solid black;
  display: flex;
  padding: 4px;
  margin: 8px;
  border-radius: 12px;
  align-items: center;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  padding: 4px;
  marginright: 6px;
  borderright: 1px solid gray;
`;
const Menu = () => {
  return (
    <ul>
      <MenuItem>FreeBoard</MenuItem>
      <MenuItem>Archive</MenuItem>
      <MenuItem>전공지식</MenuItem>
      <MenuItem>지식인</MenuItem>
      <MenuItem>PC고장신고</MenuItem>
      <MenuItem>학생회 재정 보고</MenuItem>
      <MenuItem>딥러닝 & iMac</MenuItem>
      <MenuItem>330예약</MenuItem>
    </ul>
  );
};

const Header = () => {
  return (
    <HeaderWraper>
      <LogoWrapper>Logo</LogoWrapper>
      <MenuWrapper>
        <Menu />
      </MenuWrapper>
      <NavigationWrapper>
        <LoginDialogContainer />
        <SearchBar>
          <SearchIcon icon={faSearch} size="sm" color="black" />

          <TextField id="text" type="text" value="검색기능 추가해야지" />
        </SearchBar>
      </NavigationWrapper>
    </HeaderWraper>
  );
};

export default Header;
