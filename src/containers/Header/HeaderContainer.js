import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadMenuList } from '../../modules/post';
import Header from '../../components/Header/Header';

const HeaderContainer = props => {
  const { location } = props;
  const dispatch = useDispatch();
  const [boardId, setBoardId] = useState(null);
  const { data, loading, error } = useSelector(({ post }) => ({
    data: post.loadedMenuList.data,
    loading: post.loadedMenuList.loading,
    error: post.loadedMenuList.error
  }));

  useEffect(() => {
    dispatch(loadMenuList());
  }, []);

  useEffect(() => {
    const path = location.pathname.split('/');
    if (path[1] === 'board') {
      setBoardId(path[2]);
    }
  }, [location.pathname]);

  return (
    <Header boardId={boardId} data={data} loading={loading} error={error} />
  );
};

export default withRouter(HeaderContainer);
