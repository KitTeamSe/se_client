import React from 'react';
import styled from 'styled-components';
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
  z-index: 10;
`;

const NavigationWrapper = styled.div`
  width: auto;
  margin-right: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.75rem;
  font-weight: 700;
  margin-left: 4rem;
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
  text-decoration: none;
`;

const Menu = props => {
  const { menuList, path, MenuClick } = props;
  return (
    <>
      {menuList.map(menu => (
        <MenuItem
          onClick={MenuClick}
          key={menu.url}
          href={menu.url}
          style={{ color: path === `/${menu.url}` ? 'black' : 'gray' }}
        >
          {menu.name}
        </MenuItem>
      ))}
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
      </NavigationWrapper>
    </HeaderWraper>
  );
};

export default Header;
