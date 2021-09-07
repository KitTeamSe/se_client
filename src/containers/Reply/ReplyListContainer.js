import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReplyList from '../../components/Reply/ReplyList';
import {
  initializeField,
  initializeRemove,
  loadReplyList
} from '../../modules/reply';

const ReplyListContainer = props => {
  const { location, match } = props;
  const dispatch = useDispatch();
  const { data, loading, error, add, update, remove } = useSelector(
    ({ reply }) => ({
      data: reply.loadReplyList.data,
      loading: reply.loadReplyList.loading,
      error: reply.loadReplyList.error,
      add: reply.addReply.data,
      update: reply.updateReply.data,
      remove: reply.removeReply.data
    })
  );
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
    if (add) {
      handleReplyList();
      dispatch(initializeField());
    }
    if (update) {
      handleReplyList();
      dispatch(initializeField());
    }
    if (remove) {
      handleReplyList();
      dispatch(initializeField());
      dispatch(initializeRemove());
    }
  }, [dispatch, add, update, remove]);

  return (
    <ReplyList
      data={data && data.data}
      loading={loading}
      error={error}
      totalPage={data && data.totalPage}
      page={myReplyPage}
      boardNameEng={match.params.boardNameEng}
      postId={match.params.postId}
    />
  );
};
export default withRouter(ReplyListContainer);
