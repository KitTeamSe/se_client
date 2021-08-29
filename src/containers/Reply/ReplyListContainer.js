import React, { useState, useEffect } from 'react';
import qs from 'qs';
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
  const [myReplyPage, setMyReplyPage] = useState(1);

  const handleReplyList = () => {
    const {
      size = 10,
      replyPage = 1,
      direction = 'ASC'
    } = qs.parse(location.search, {
      ignoreQueryPrefix: true
    });
    const { postId } = match.params;

    setMyReplyPage(replyPage);
    dispatch(loadReplyList({ postId, direction, size, page: replyPage - 1 }));
  };

  useEffect(() => {
    handleReplyList();
  }, [location.search]);

  useEffect(() => {
    handleReplyList();
    dispatch(initializeField());
  }, [dispatch, add, update]);

  return (
    <ReplyList
      data={data && data.data}
      loading={loading}
      error={error}
      totalPage={data && data.totalPage}
      page={myReplyPage}
      boardId={match.params.boardId}
      postId={match.params.postId}
    />
  );
};
export default withRouter(ReplyListContainer);