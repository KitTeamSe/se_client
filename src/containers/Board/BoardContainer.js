import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Board from '../../components/Board/Board';
import { loadPostList, searchPost } from '../../modules/post';

const BoardContainer = props => {
  const { location, match } = props;
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [boardPage, setBoardPage] = useState(1);
  const [postSearchType, setPostSearchType] = useState('TITLE_TEXT');
  const { data, loading, error, menuListObj } = useSelector(({ post }) => ({
    data: post.loadedPostList.data,
    loading: post.loadedPostList.loading,
    error: post.loadedPostList.error,
    menuListObj: post.loadedMenuList
  }));

  const pageSize = 20;

  const { boardNameEng } = match.params;
  useEffect(() => {
    const {
      page,
      size = pageSize,
      direction = 'DESC'
    } = qs.parse(location.search, {
      ignoreQueryPrefix: true
    });

    if (page === undefined) {
      const parameter = {
        boardNameEng,
        direction,
        page: 0,
        size
      };
      dispatch(loadPostList(parameter));
      setBoardPage(1);
      return;
    }

    const parameter = {
      boardNameEng,
      direction,
      page: page - 1,
      size
    };
    dispatch(loadPostList(parameter));
    setBoardPage(page);
  }, [location.search]);

  const onChange = e => {
    e.preventDefault();
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
    setSearchKeyword(keyword);
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
      size: pageSize
    };
    const postSearchRequest = {
      boardNameEng,
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
      searchKeyword={searchKeyword}
      onPostSearchTypeChange={onPostSearchTypeChange}
      postSearchType={postSearchType}
      menuListObj={menuListObj}
      boardNameEng={boardNameEng}
      boardPage={boardPage}
    />
  );
};

export default withRouter(BoardContainer);
