import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Board from '../../components/Board/Board';
import {
  loadNormalpostList,
  loadNoticepostList,
  searchPost
} from '../../modules/post';

const BoardContainer = props => {
  const { location, match, history } = props;
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [boardPage, setBoardPage] = useState(1);
  const [boardDescription, setBoardDescription] = useState('');
  const [postSearchType, setPostSearchType] = useState('TITLE_TEXT');
  const { data, loading, error, menuList, NoticeData } = useSelector(
    ({ post, menu }) => ({
      data: post.loadedNormalPostList.data,
      loading: post.loadedNormalPostList.loading,
      error: post.loadedNormalPostList.error,
      menuList: menu.loadedMenuList.data,
      NoticeData: post.loadedNoticePostList.data
    })
  );

  const pageSize = 20;
  const { boardNameEng } = match.params;

  useEffect(() => {
    if (menuList) {
      const myMenu = menuList.data.find(menu => menu.nameEng === boardNameEng);
      if (myMenu) {
        setBoardDescription(myMenu.description);
      }
    }

    const params = {
      boardNameEng,
      direction: 'DESC',
      isNotice: 'NOTICE',
      page: 0,
      size: 50
    };
    dispatch(loadNoticepostList(params));

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
        isNotice: 'NORMAL',
        page: 0,
        size
      };
      dispatch(loadNormalpostList(parameter));
      setBoardPage(1);
      return;
    }

    const parameter = {
      boardNameEng,
      direction,
      isNotice: 'NORMAL',
      page: page - 1,
      size
    };
    dispatch(loadNormalpostList(parameter));
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

  const onWritePost = () => {
    history.push(`${match.url}/write`);
  };

  return (
    <Board
      data={data}
      loading={loading}
      error={error}
      NoticeData={NoticeData}
      onChange={onChange}
      onSearchChange={onSearchChange}
      onSearch={onSearch}
      onWritePost={onWritePost}
      keyword={keyword}
      searchKeyword={searchKeyword}
      onPostSearchTypeChange={onPostSearchTypeChange}
      postSearchType={postSearchType}
      boardNameEng={boardNameEng}
      boardPage={boardPage}
      boardDescription={boardDescription}
    />
  );
};

export default withRouter(BoardContainer);
