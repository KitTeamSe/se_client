import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Board from '../../components/Board/Board';
import { loadPostList, searchPost } from '../../modules/post';

const BoardContainer = props => {
  const { location } = props;
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const [nowBoard, setNowBoard] = useState(null);
  const [postSearchType, setPostSearchType] = useState('TITLE_TEXT');
  const [pageNumber, setPageNumber] = useState(1);
  const { data, loading, error, menuListObj } = useSelector(({ post }) => ({
    data: post.loadedPostList.data,
    loading: post.loadedPostList.loading,
    error: post.loadedPostList.error,
    menuListObj: post.loadedMenuList
  }));
  const boardId = location.pathname.substring(1);

  useEffect(() => {
    const parameter = {
      boardId,
      direction: 'DESC',
      page: pageNumber - 1,
      size: 20
    };
    dispatch(loadPostList(parameter));
  }, [location, pageNumber]);
  useEffect(() => {
    if (menuListObj.data !== null) {
      for (let i = 0; i < menuListObj.data.data.length; i += 1) {
        if (menuListObj.data.data[i].boardId === Number(boardId)) {
          setNowBoard(menuListObj.data.data[i]);
        }
      }
    }
  }, [menuListObj]);

  const onChange = e => {
    e.preventDefault();
    if (e.target.outerText !== undefined) {
      setPageNumber(Number(e.target.outerText));
    }
  };

  const onSearchChange = e => {
    const { value } = e.target;
    setKeyword(value);
  };

  const onPostSearchTypeChange = e => {
    e.preventDefault();
    const { value } = e.target;
    setPostSearchType(value);
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
    const postSearchRequest = {
      boardId,
      keyword,
      pageRequest,
      postSearchType
    };
    dispatch(searchPost({ postSearchRequest }));
  };

  return (
    <Board
      data={data}
      loading={loading}
      error={error}
      onChange={onChange}
      onSearchChange={onSearchChange}
      onSearch={onSearch}
      keyword={keyword}
      onPostSearchTypeChange={onPostSearchTypeChange}
      postSearchType={postSearchType}
      menuListObj={menuListObj}
      nowBoard={nowBoard}
    />
  );
};

export default withRouter(BoardContainer);
