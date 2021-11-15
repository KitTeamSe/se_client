import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Pagination from '../../components/Common/Pagination/Pagination';

const ReplyPaginationContainer = props => {
  const { location } = props;
  const { replyData } = useSelector(({ reply }) => ({
    replyData: reply.loadReplyList.data
  }));
  const myPage = qs.parse(location.search, {
    ignoreQueryPrefix: true
  }).page;
  const replyPage = myPage !== undefined ? myPage : 1;
  const totalPage = replyData ? replyData.totalPage : 1;

  const qsMaker = item => {
    const { page } = qs.parse(location.search, { ignoreQueryPrefix: true });
    return qs.stringify({ page, replyPage: item.page });
  };

  return (
    <Pagination page={replyPage} totalPage={totalPage} qsMaker={qsMaker} />
  );
};

export default withRouter(ReplyPaginationContainer);
