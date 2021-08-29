import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadMenuList } from '../../modules/post';
import Header from '../../components/Header/Header';

const HeaderContainer = props => {
  const { location, match } = props;
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(({ post }) => ({
    data: post.loadedMenuList.data,
    loading: post.loadedMenuList.loading,
    error: post.loadedMenuList.error
  }));
  const path = location.pathname;
  const { boardId } = match.params;

  useEffect(() => {
    dispatch(loadMenuList());
  }, []);

  return (
    <Header
      boardId={boardId}
      path={path}
      data={data}
      loading={loading}
      error={error}
    />
  );
};

export default withRouter(HeaderContainer);
