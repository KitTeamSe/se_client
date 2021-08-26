import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Board from '../../components/Board/Board';
import { loadPostList, searchPost } from '../../modules/post';

const BoardContainer = () => {
  const dispatch = useDispatch();
  const [path, setPath] = useState('/');
  const [keyword, setKeyword] = useState('');
  const [postSearchType, setPostSearchType] = useState('TITLE_TEXT');
  const [pageNumber, setPageNumber] = useState(1);
  const { data, loading, error, nowBoard } = useSelector(({ post }) => ({
    data: post.loadedPostList.data,
    loading: post.loadedPostList.loading,
    error: post.loadedPostList.error,
    nowBoard: post.selectBoard.value
  }));

  const nowUrl = window.location.pathname;
  if (path !== nowUrl) {
    setPath(nowUrl);
  }

  useEffect(() => {
    if (Object.keys(nowBoard).length !== 0) {
      const { boardId } = nowBoard;
      const parameter = {
        boardId,
        direction: 'DESC',
        page: pageNumber - 1,
        size: 20
      };
      dispatch(loadPostList(parameter));
    }
  }, [nowBoard, pageNumber]);

  const onChange = e => {
    e.preventDefault();
    if (e.target.outerText !== undefined) {
      setPageNumber(Number(e.target.outerText));
    }
    if (e.target.id === 'text') {
      const { value } = e.target;
      setKeyword(value);
    }
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
    console.log(nowBoard);
    if (nowBoard.boardId !== null) {
      const { boardId } = nowBoard;
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
    <Board
      data={data}
      loading={loading}
      error={error}
      nowBoard={nowBoard}
      onChange={onChange}
      onSearch={onSearch}
      keyword={keyword}
      onPostSearchTypeChange={onPostSearchTypeChange}
      postSearchType={postSearchType}
    />
  );
};

export default BoardContainer;
