import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadMenuList } from '../../modules/menu';
import Header from '../../components/Header/Header';

const HeaderContainer = props => {
  const { location } = props;
  const dispatch = useDispatch();
  const { data, loading, signin } = useSelector(({ menu, auth }) => ({
    data: menu.loadedMenuList.data,
    loading: menu.loadedMenuList.loading,
    signin: auth.auth.data
  }));
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    dispatch(loadMenuList());
  }, [signin]);

  useEffect(() => {
    handleMenuClose();
  }, [location]);

  return (
    <Header
      data={data}
      loading={loading}
      menuOpen={menuOpen}
      handleMenuOpen={handleMenuOpen}
      handleMenuClose={handleMenuClose}
    />
  );
};

export default withRouter(HeaderContainer);
