import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoginDialogContainer from '../../containers/LoginDialog/LoginDialogContainer';

const HeaderWraper = styled.header`
  width: 100%;
  min-height: 80px;
  position: fixed;
  display: flex;
  justify-content: center;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 4px 12px;
  background-color: white;
  z-index: 10;
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    min-height: 60px;
    box-shadow: none;
  }
`;

const NavWrapper = styled.nav`
  display: flex;
  flex-wrap: wrap;
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    width: 100%;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${({ theme }) => theme.size.tablet};
  @media ${({ theme }) => theme.sizeQuery.tablet} {
    width: ${({ theme }) => theme.size.mobile};
  }
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    width: 100%;
  }
`;

const NavigationWrapper = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.75rem;
  font-weight: 700;
  text-decoration: none;
  color: #000000;
  line-height: 78px;
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    margin-left: 20px;
    line-height: 60px;
  }
`;

const MenuUl = styled.ul`
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  padding-left: 15px;
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0;
    border-top: 1px rgba(0, 0, 0, 0.1) solid;
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 10%);
  }
`;

const ChildMenuUl = styled(MenuUl)`
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    border-top: none;
  }
`;

const MenuFolder = styled.p`
  display: inline-block;
  color: gray;
  padding: 0 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  line-height: 78px;
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    width: 100%;
    text-align: center;
    line-height: 50px;
    padding: 0;
    border-bottom: 1px rgba(0, 0, 0, 0.1) solid;
  }
`;

const MenuRedirect = styled.a`
  display: inline-block;
  color: gray;
  padding: 0 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  line-height: 78px;
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    width: 100%;
    text-align: center;
    line-height: 50px;
    padding: 0;
    border-bottom: 1px rgba(0, 0, 0, 0.1) solid;
  }
`;

const MenuLink = styled(NavLink)`
  display: inline-block;
  color: gray;
  padding: 0 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  line-height: 78px;
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    width: 100%;
    text-align: center;
    line-height: 50px;
    padding: 0;
    border-bottom: 1px rgba(0, 0, 0, 0.1) solid;
  }
`;

const List = styled.li`
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    display: none;
  }
`;

const MoblieList = styled.li`
  display: none;
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    display: block;
    width: 100%;
    text-align: center;
  }
`;

const AccountList = styled(MoblieList)`
  display: none;
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    display: flex;
  }
`;

const LoadingCircle = styled(CircularProgress)`
  position: fixed;
  top: 45vh;
  right: 50vw;
`;

const MenuButtonStyled = styled.button`
  cursor: pointer;
  display: none;
  position: absolute;
  top: 5px;
  right: 10px;
  width: 30px;
  height: 30px;
  vertical-align: middle;
  padding: 24px;
  border: none;
  border-radius: 50%;
  text-decoration: none;
  background: transparent;
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 20px;
`;

const MenuButton = props => {
  const { menuOpen, handleMenuOpen, handleMenuClose } = props;

  return (
    <MenuButtonStyled onClick={menuOpen ? handleMenuClose : handleMenuOpen}>
      <Icon icon={faBars} size="lg" />
    </MenuButtonStyled>
  );
};

const Menu = props => {
  const { data } = props;

  return (
    <MenuUl>
      {data.data.map(menu => (
        <List key={menu.boardId}>
          <MenuLink
            to={`/board/${menu.nameEng}`}
            activeStyle={{ color: 'black' }}
          >
            {menu.nameKor}
          </MenuLink>
        </List>
      ))}
    </MenuUl>
  );
};

const ChildMobileMenu = props => {
  const { data, open } = props;
  return (
    open && (
      <ChildMenuUl>
        {data.map(menu => (
          <MoblieList key={menu.boardId}>
            {menu.menuType === 'BOARD' && (
              <MenuLink
                to={`/board/${menu.nameEng}`}
                activeStyle={{ color: 'black' }}
              >
                {menu.nameKor}
              </MenuLink>
            )}

            {menu.menuType === 'REDIRECT' && (
              <MenuRedirect href={menu.url}>{menu.nameKor}</MenuRedirect>
            )}
          </MoblieList>
        ))}
      </ChildMenuUl>
    )
  );
};

const MobileMenu = props => {
  const { data } = props;
  const [open, setOpen] = useState([]);

  const handleOpen = id => {
    const currentIndex = open.indexOf(id);
    const newChecked = [...open];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setOpen(newChecked);
  };

  return (
    <MenuUl>
      {data.data.map((menu, idx) => (
        <MoblieList key={menu.boardId}>
          {menu.menuType === 'BOARD' && (
            <MenuLink
              to={`/board/${menu.nameEng}`}
              activeStyle={{ color: 'black' }}
            >
              {menu.nameKor}
            </MenuLink>
          )}
          {menu.menuType === 'FOLDER' && (
            <>
              <MenuFolder onClick={() => handleOpen(idx)}>
                {menu.nameKor}
              </MenuFolder>
              <ChildMobileMenu
                data={menu.child}
                open={open.indexOf(idx) !== -1}
              />
            </>
          )}
          {menu.menuType === 'REDIRECT' && (
            <MenuRedirect href={menu.url}>{menu.nameKor}</MenuRedirect>
          )}
        </MoblieList>
      ))}
      <AccountList>
        {localStorage.getItem('userId') || localStorage.getItem('token') ? (
          <>
            <MenuLink to={`/profile/${localStorage.getItem('userId')}`}>
              프로필
            </MenuLink>
            <MenuLink to="/signout">로그아웃</MenuLink>
          </>
        ) : (
          <MenuLink to="/signin">로그인</MenuLink>
        )}
      </AccountList>
    </MenuUl>
  );
};

const Header = props => {
  const { data, loading, menuOpen, handleMenuOpen, handleMenuClose } = props;
  if (data === null || loading) {
    return <LoadingCircle />;
  }
  return (
    <HeaderWraper>
      <ContentWrapper>
        <NavWrapper>
          <Logo to="/board/freeboard">SE Board</Logo>
          <Menu data={data} />
          {menuOpen && <MobileMenu data={data} />}
        </NavWrapper>
        <NavigationWrapper>
          <LoginDialogContainer />
        </NavigationWrapper>
      </ContentWrapper>
      <MenuButton
        menuOpen={menuOpen}
        handleMenuOpen={handleMenuOpen}
        handleMenuClose={handleMenuClose}
      />
    </HeaderWraper>
  );
};

export default Header;
