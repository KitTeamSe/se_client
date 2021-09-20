import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadMenuList } from '../../modules/menu';
import Header from '../../components/Header/Header';

const HeaderContainer = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(({ menu }) => ({
    data: menu.loadedMenuList.data,
    loading: menu.loadedMenuList.loading,
    error: menu.loadedMenuList.error
  }));

  useEffect(() => {
    dispatch(loadMenuList());
  }, []);
  return <Header data={data} loading={loading} error={error} />;
};

export default withRouter(HeaderContainer);
