import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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

const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.75rem;
  font-weight: 700;
  margin-left: 4rem;
  text-decoration: none;
  color: #57bee1;
`;

const MenuWrapper = styled.nav`
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
`;

const MenuItem = styled(Link)`
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
  const { data, path } = props;
  return (
    <ul>
      {data.data.map(menu => (
        <li key={menu.boardId}>
          <MenuItem
            to={`/${menu.boardId}`}
            style={{ color: path === `/${menu.boardId}` ? 'black' : 'gray' }}
          >
            {menu.nameKor}
          </MenuItem>
        </li>
      ))}
    </ul>
  );
};

const Header = props => {
  const { path, data, loading } = props;
  if (data === null || loading) {
    return <LoadingCircle />;
  }
  return (
    <HeaderWraper>
      <LogoWrapper to="/1">SE Board</LogoWrapper>
      <MenuWrapper>
        <Menu path={path} data={data} />
      </MenuWrapper>
      <NavigationWrapper>
        <LoginDialogContainer />
      </NavigationWrapper>
    </HeaderWraper>
  );
};

export default Header;
