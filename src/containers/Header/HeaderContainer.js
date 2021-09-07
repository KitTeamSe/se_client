import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadMenuList, changeBoard } from '../../modules/post';
import Header from '../../components/Header/Header';

const HeaderContainer = props => {
  const { location } = props;
  const dispatch = useDispatch();
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
      if (data !== null) {
        const menu = data.data;
        for (let i = 0; i < menu.length; i += 1) {
          if (menu[i].nameEng === path[2]) {
            const { boardId } = menu[i];
            dispatch(changeBoard({ boardId }));
          }
        }
      }
    }
  }, [location.pathname, data]);

  return <Header data={data} loading={loading} error={error} />;
};

export default withRouter(HeaderContainer);
