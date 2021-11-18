import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Pagination from '../../components/Common/Pagination/Pagination';

const BoardPaginationContainer = props => {
  const { location } = props;
  const { postData } = useSelector(({ board }) => ({
    postData: board.loadedNormalPostList.data
  }));
  const myPage = qs.parse(location.search, {
    ignoreQueryPrefix: true
  }).page;
  const boardPage = myPage !== undefined ? myPage : 1;
  const totalPage = postData ? postData.data.postListItem.totalPages : 1;

  const qsMaker = item => {
    const { secret, replyPage } = qs.parse(location.search, {
      ignoreQueryPrefix: true
    });
    return qs.stringify({ secret, page: item.page, replyPage });
  };

  return (
    <Pagination page={boardPage} totalPage={totalPage} qsMaker={qsMaker} />
  );
};

export default withRouter(BoardPaginationContainer);
