import qs from 'qs';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReplyList from '../../components/Reply/ReplyList';
import { initializeField, loadReplyList } from '../../modules/reply';

const ReplyListContainer = props => {
  const { location, match } = props;
  const dispatch = useDispatch();
  const { data, loading, error, add, update } = useSelector(({ reply }) => ({
    data: reply.loadReplyList.data,
    loading: reply.loadReplyList.loading,
    error: reply.loadReplyList.error,
    add: reply.addReply.data,
    update: reply.updateReply.data
  }));

  useEffect(() => {
    const {
      size = 20,
      page = 0,
      direction = 'ASC'
    } = qs.parse(location.search, {
      ignoreQueryPrefix: true
    });
    const { postId } = match.params;
    dispatch(loadReplyList({ postId, direction, size, page }));
    dispatch(initializeField());
  }, [dispatch, location.search, add, update]);

  return <ReplyList data={data && data.data} loading={loading} error={error} />;
};
export default withRouter(ReplyListContainer);
