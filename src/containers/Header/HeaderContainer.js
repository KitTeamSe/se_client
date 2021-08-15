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
    loadedMenu: post.loadMenuList
  }));

  useEffect(() => {
    const nowUrl = window.location.pathname;
    setPath(nowUrl);
    dispatch(loadMenuList());
  }, []);

  useEffect(() => {
    if (loadedMenu !== null) {
      for (let i = 0; i < loadedMenu.length; i += 1) {
        // defalut board 가 생기면 삭제
        if (
          loadedMenu[i].url === path.substring(1) ||
          path.substring(1) === ''
        ) {
          dispatch(boardChange({ value: loadedMenu[i] }));
        } else {
          dispatch(boardChange({ value: {} }));
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
