import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadNormalpostList, loadNoticepostList } from '../../modules/board';
import BoardPostList from '../../components/Board/BoardPostList';

const BoardPostListContainer = props => {
  const { location, match } = props;

  const dispatch = useDispatch();
  const [boardPage, setBoardPage] = useState(1);
  const pageSize = 20;
  const {
    postData,
    postLoading,
    postError,
    noticeData,
    noticeLoading,
    noticeError,
    signin
  } = useSelector(({ board, auth }) => ({
    postData: board.loadedNormalPostList.data,
    postLoading: board.loadedNormalPostList.loading,
    postError: board.loadedNormalPostList.error,
    noticeData: board.loadedNoticePostList.data,
    noticeLoading: board.loadedNoticePostList.loading,
    noticeError: board.loadedNoticePostList.error,
    signin: auth.auth.data
  }));

  const { boardNameEng } = match.params;

  useEffect(() => {
    const params = {
      boardNameEng,
      direction: 'DESC',
      isNotice: 'NOTICE',
      page: 0,
      size: pageSize
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
  }, [signin, match.params.boardNameEng, location.search]);

  return (
    <BoardPostList
      postData={postData}
      postLoading={postLoading}
      postError={postError}
      noticeData={noticeData}
      noticeLoading={noticeLoading}
      noticeError={noticeError}
      boardNameEng={boardNameEng}
      boardPage={boardPage}
    />
  );
};

export default withRouter(BoardPostListContainer);
