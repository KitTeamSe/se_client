import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Pagination from './Pagination';

const PaginationContainer = props => {
  const { location } = props;
  const { data } = useSelector(({ example }) => ({
    exampleList: example.loadExampleList.data
  }));
  const myPage = qs.parse(location.search, {
    ignoreQueryPrefix: true
  }).page;
  const nowPage = myPage !== undefined ? myPage : 1;
  const totalPage = data ? data.data.totalPages : 1;

  const qsMaker = item => {
    const { secret, replyPage } = qs.parse(location.search, {
      ignoreQueryPrefix: true
    });
    return qs.stringify({ secret, page: item.page, replyPage });
  };

  return <Pagination page={nowPage} totalPage={totalPage} qsMaker={qsMaker} />;
};

export default withRouter(PaginationContainer);
