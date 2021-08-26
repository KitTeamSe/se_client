import React from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';
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

const LoadingCircle = styled(CircularProgress)`
  position: fixed;
  top: 45vh;
  right: 50vw;
`;

const Menu = props => {
  const { data, path, MenuClick } = props;
  return (
    <>
      {data.data.map(menu => (
        <MenuItem
          onClick={MenuClick}
          key={menu.url}
          href={menu.boardId}
          style={{ color: path === `/${menu.boardId}` ? 'black' : 'gray' }}
        >
          {menu.nameKor}
        </MenuItem>
      ))}
    </>
  );
};

const Header = props => {
  const { path, LogoClick, MenuClick, data, loading, error } = props;
  console.log(data, loading, error);
  if (data === null || loading) {
    return <LoadingCircle />;
  }
  return (
    <HeaderWraper>
      <LogoWrapper onClick={LogoClick}>Logo</LogoWrapper>
      <MenuWrapper>
        <Menu path={path} MenuClick={MenuClick} data={data} />
      </MenuWrapper>
      <NavigationWrapper>
        <LoginDialogContainer />
      </NavigationWrapper>
    </HeaderWraper>
  );
};

export default Header;
