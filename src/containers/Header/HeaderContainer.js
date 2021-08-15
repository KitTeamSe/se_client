import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { menuList } from '../../DataExport';
import Header from '../../components/Header/Header';

const HeaderContainer = () => {
  const history = useHistory();

  const [path, setPath] = useState('/');

  useEffect(() => {
    const nowUrl = window.location.pathname;
    setPath(nowUrl);
  }, []);

  const LogoClick = () => {
    history.push('/');
    setPath('/');
  };

  const MenuClick = e => {
    e.preventDefault();
    const url = e.currentTarget.getAttribute('href');
    history.push(`/${url}`);
    setPath(`/${url}`);
  };

  return (
    <Header
      path={path}
      LogoClick={LogoClick}
      menuList={menuList}
      MenuClick={MenuClick}
    />
  );
};

export default HeaderContainer;
