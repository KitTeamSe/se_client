import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BoardPagination from '../../components/Board/BoardPagination';

const BoardPaginationContainer = props => {
  const { location } = props;
  const { postData } = useSelector(({ board }) => ({
    postData: board.loadedNormalPostList.data
  }));
  const myPage = qs.parse(location.search, {
    ignoreQueryPrefix: true
  }).page;
  const boardPage = myPage !== undefined ? myPage : 1;

  const qsMaker = item => {
    const { secret, replyPage } = qs.parse(location.search, {
      ignoreQueryPrefix: true
    });
    const { page } = item;
    const qsResult = qs.stringify({ secret, page, replyPage });
    return qsResult;
  };

  return (
    <BoardPagination
      postData={postData}
      boardPage={boardPage}
      qsMaker={qsMaker}
    />
  );
};

export default withRouter(BoardPaginationContainer);
