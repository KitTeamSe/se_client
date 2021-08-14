import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadMenuList } from '../../modules/post';

import Header from '../../components/Header/Header';

const HeaderContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = localStorage.getItem('token');

  const { menuListObj, menuError } = useSelector(({ post }) => ({
    menuListObj: post.loadMenuList,
    menuError: post.loadMenuListError
  }));

  const [menuList, setMenuList] = useState([]);
  const [path, setPath] = useState('/');

  useEffect(() => {
    dispatch(loadMenuList({ token }));
  }, []);

  useEffect(() => {
    setPath(window.location.pathname);
    if (menuError !== null) {
      console.log('error');
    }
    if (menuListObj === null) {
      const menuListInfo = {
        boardId: 0,
        child: [],
        description: '메뉴가 존재하지 않습니다',
        menuId: 0,
        menuOrder: 0,
        nameEng: 'none',
        nameKor: '존재하지 않음',
        parentId: null,
        url: ''
      };
      setMenuList([menuListInfo]);
    } else {
      const menuListInfo = menuListObj.map(menuObj => {
        const {
          boardId,
          child,
          description,
          menuId,
          menuOrder,
          nameEng,
          nameKor,
          parentId,
          url
        } = menuObj;
        const menu = {
          boardId,
          child,
          description,
          menuId,
          menuOrder,
          nameEng,
          nameKor,
          parentId,
          url
        };
        return menu;
      });
      setMenuList(menuListInfo);
    }
  }, [menuListObj, menuError]);

  const LogoClick = () => {
    history.push('/');
    setPath('/');
  };

  return <Header path={path} LogoClick={LogoClick} menuList={menuList} />;
};

export default HeaderContainer;
