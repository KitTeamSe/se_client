import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loadMenuList, boardChange, searchPost } from '../../modules/post';
import { menuList } from '../../DataExport';
import Header from '../../components/Header/Header';

const HeaderContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [path, setPath] = useState('/');
  const [keyword, setKeyword] = useState('');
  const { loadedMenu } = useSelector(({ post }) => ({
    loadedMenu: post.loadMenuList
  }));
  const { nowBoard } = useSelector(({ post }) => ({
    nowBoard: post.selectBoard
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

  const onChange = e => {
    const { value } = e.target;

    setKeyword(value);
  };

  const onSearch = e => {
    e.preventDefault();
    if (keyword.length === 0) {
      console.log('한글자 이상 입력하세요');
      return;
    }
    if (keyword.length > 50) {
      console.log('최대 50자 까지만 입력 가능합니다');
      return;
    }
    const pageRequest = {
      direction: 'DESC',
      page: 1,
      size: 20
    };
    const postSearchType = 'NICKNAME';
    if (nowBoard.value.boardId !== null) {
      const { boardId } = nowBoard.value;
      const postSearchRequest = {
        boardId,
        keyword,
        pageRequest,
        postSearchType
      };
      dispatch(searchPost({ postSearchRequest }));
    } else {
      console.log('선택된 게시판이 없습니다.');
    }
  };

  return (
    <Header
      path={path}
      LogoClick={LogoClick}
      menuList={menuList}
      MenuClick={MenuClick}
      onChange={onChange}
      keyword={keyword}
      onSearch={onSearch}
    />
  );
};

export default HeaderContainer;
