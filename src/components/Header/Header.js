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
  background-color: white;
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
  font-size: 1.75rem;
  font-weight: 700;
`;

const MenuWrapper = styled.nav`
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
  font-size: 1rem;
  &:link {
    text-decoration: none;
  }
`;

const NowMenuItem = styled.span`
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

const Menu = props => {
  const { menuList, path, MenuClick } = props;
  return (
    <>
      {menuList.map(menu => {
        if (path === `/${menu.url}`) {
          return (
            <NowMenuItem key={menu.url} href={menu.url}>
              {menu.name}
            </NowMenuItem>
          );
        }
        return (
          <MenuItem onClick={MenuClick} key={menu.url} href={menu.url}>
            {menu.name}
          </MenuItem>
        );
      })}
    </>
  );
};

const Header = props => {
  const { path, LogoClick, menuList, MenuClick } = props;

  return (
    <HeaderWraper>
      <LogoWrapper onClick={LogoClick}>Logo</LogoWrapper>
      <MenuWrapper>
        <Menu menuList={menuList} path={path} MenuClick={MenuClick} />
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
