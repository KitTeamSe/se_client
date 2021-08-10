import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { TextField } from '@material-ui/core';
import LoginDialogContainer from '../../containers/LoginDialog/LoginDialogContainer';

const HeaderWraper = styled.header`
  width: 100%;
  height: 96px;
  align-items: center;
  position: fixed;
  display: flex;
  justify-content: space-between;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const NavigationWrapper = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
`;

const LogoWrapper = styled.div`
  width: 196px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 24px;
  font-weight: 700;
`;

const MenuWrapper = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
`;

const MenuItem = styled.a`
  color: gray;
  padding: 8px 12px;
  cursor: pointer;
  font-weight: 600;
  &:link {
    text-decoration: none;
  }
`;

const NowMenuItem = styled.a`
  color: black;
  padding: 8px 12px;
  cursor: pointer;
  font-weight: 800;
  &:link {
    text-decoration: none;
  }
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
  margin-right: 6px;
  border-right: 1px solid gray;
  color: black;
`;

const dummyMenu = {
  free: 'FreeBoard',
  archive: 'Archive',
  book: '전공지식',
  naver: '지식인',
  pc: 'PC고장신고',
  money: '학생회 재정 보고',
  imac: '딥러닝 & iMac',
  330: '330예약'
};

const menuList = Object.keys(dummyMenu);
const path = window.location.pathname;
const Menu = () => {
  return (
    <ul>
      {menuList.map(menu => {
        if (path === `/${menu}`) {
          return (
            <NowMenuItem key={menu} href={menu}>
              {dummyMenu[menu]}
            </NowMenuItem>
          );
        }
        return (
          <MenuItem key={menu} href={menu}>
            {dummyMenu[menu]}
          </MenuItem>
        );
      })}
    </ul>
  );
};

const Header = props => {
  const { LogoClick } = props;

  return (
    <HeaderWraper>
      <LogoWrapper onClick={LogoClick}>Logo</LogoWrapper>
      <MenuWrapper>
        <Menu />
      </MenuWrapper>
      <NavigationWrapper>
        <LoginDialogContainer />
        <SearchBar>
          <SearchIcon icon={faSearch} size="sm" />
          <TextField id="text" type="text" value="검색기능 추가해야지" />
        </SearchBar>
      </NavigationWrapper>
    </HeaderWraper>
  );
};

export default Header;
