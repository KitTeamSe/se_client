import React, { useEffect } from 'react';
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

  useEffect(() => {
    dispatch(loadMenuList({ token }));
  }, []);

  useEffect(() => {
    if (menuError !== null) {
      console.log('error');
    }
  }, [menuListObj, menuError]);

  const LogoClick = () => {
    history.push('/');
  };

  return <Header LogoClick={LogoClick} menuListObj={menuListObj} />;
};

export default HeaderContainer;
