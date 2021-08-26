import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loadMenuList, boardChange } from '../../modules/post';
import { menuList } from '../../DataExport';
import Header from '../../components/Header/Header';

const HeaderContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [path, setPath] = useState('/');
  const { loadedMenu } = useSelector(({ post }) => ({
    loadedMenu: post.loadedMenuList.data
  }));

  useEffect(() => {
    const nowUrl = window.location.pathname;
    setPath(nowUrl);
    dispatch(loadMenuList());
  }, []);

  useEffect(() => {
    if (loadedMenu !== null) {
      for (let i = 0; i < loadedMenu.data.length; i += 1) {
        if (
          loadedMenu.data[i].url === path.substring(1) ||
          path.substring(1) === ''
        ) {
          const boardValue = loadedMenu.data[i];
          dispatch(boardChange({ value: boardValue }));
        } else {
          dispatch(boardChange({ value: { boardId: 0 } }));
        }
      }
    }
  }, [loadedMenu, path]);

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
