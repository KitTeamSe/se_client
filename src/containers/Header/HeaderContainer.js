import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadMenuList } from '../../modules/menu';
import Header from '../../components/Header/Header';

const HeaderContainer = props => {
  const { location } = props;
  const dispatch = useDispatch();
  const { data, loading, signin, isPopoverOpen } = useSelector(
    ({ menu, auth, styles }) => ({
      data: menu.loadedMenuList.data,
      loading: menu.loadedMenuList.loading,
      signin: auth.auth.data,
      isPopoverOpen: styles.isPopoverOpen
    })
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleSearchOpen = () => {
    setSearchOpen(true);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
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
      searchOpen={searchOpen}
      handleMenuOpen={handleMenuOpen}
      handleMenuClose={handleMenuClose}
      handleSearchOpen={handleSearchOpen}
      handleSearchClose={handleSearchClose}
      isPopoverOpen={isPopoverOpen}
    />
  );
};

export default withRouter(HeaderContainer);
