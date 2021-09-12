import React from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
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

const MenuUl = styled.ul`
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
`;

const MenuItem = styled(NavLink)`
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
  const { data } = props;
  return (
    <MenuUl>
      {data.data.map(menu => (
        <li key={menu.boardId}>
          <MenuItem
            to={`/board/${menu.nameEng}`}
            activeStyle={{ color: 'black' }}
          >
            {menu.nameKor}
          </MenuItem>
        </li>
      ))}
    </MenuUl>
  );
};

const Header = props => {
  const { data, loading } = props;
  if (data === null || loading) {
    return <LoadingCircle />;
  }
  return (
    <HeaderWraper>
      <LogoWrapper to="/1">SE Board</LogoWrapper>
      <nav>
        <Menu data={data} />
      </nav>
      <NavigationWrapper>
        <LoginDialogContainer />
      </NavigationWrapper>
    </HeaderWraper>
  );
};

export default Header;
