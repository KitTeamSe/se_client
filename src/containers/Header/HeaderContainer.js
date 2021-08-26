import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { loadMenuList } from '../../modules/post';
import Header from '../../components/Header/Header';

const HeaderContainer = props => {
  const { location } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(({ post }) => ({
    data: post.loadedMenuList.data,
    loading: post.loadedMenuList.loading,
    error: post.loadedMenuList.error
  }));
  const path = location.pathname;

  useEffect(() => {
    dispatch(loadMenuList());
  }, []);

  const LogoClick = () => {
    history.push('/');
  };

  const MenuClick = e => {
    e.preventDefault();
    const url = e.currentTarget.getAttribute('href');
    history.push(`/${url}`);
  };

  return (
    <Header
      path={path}
      LogoClick={LogoClick}
      MenuClick={MenuClick}
      data={data}
      loading={loading}
      error={error}
    />
  );
};

export default withRouter(HeaderContainer);
