import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReplyList from '../../components/Reply/ReplyList';
import {
  initializeField,
  initializeAdd,
  initializeUpdate,
  initializeRemove,
  changeField,
  loadReplyList,
  changeSecretReply,
  initializeSecret
} from '../../modules/reply';

const ReplyListContainer = props => {
  const { location, match } = props;
  const dispatch = useDispatch();
  const {
    data,
    loading,
    error,
    add,
    update,
    remove,
    secret,
    parentIndex,
    replyIndex
  } = useSelector(({ reply }) => ({
    data: reply.loadReplyList.data,
    loading: reply.loadReplyList.loading,
    error: reply.loadReplyList.error,
    add: reply.addReply.data,
    update: reply.updateReply.data,
    remove: reply.removeReply.data,
    secret: reply.loadSecretReply.data,
    parentIndex: reply.loadSecretForm.parentIndex,
    replyIndex: reply.loadSecretForm.replyIndex
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

  const handleAddReplyChild = parentId => {
    dispatch(
      changeField({
        form: 'addChildForm',
        key: 'parentId',
        value: parentId
      })
    );
  };

  useEffect(() => {
    handleReplyList();
  }, [location.search]);

  useEffect(() => {
    if (add) {
      handleReplyList();
      dispatch(initializeAdd());
    }
    if (update) {
      handleReplyList();
      dispatch(initializeUpdate());
    }
    if (remove) {
      handleReplyList();
      dispatch(initializeRemove());
    }
    if (secret) {
      dispatch(changeSecretReply({ parentIndex, replyIndex }));
      dispatch(initializeSecret());
    }
    dispatch(initializeField());
  }, [add, update, remove, secret]);

  return (
    <ReplyList
      data={data && data.data}
      loading={loading}
      error={error}
      totalPage={data && data.totalPage}
      totalData={data && data.totalData}
      page={myReplyPage}
      boardId={match.params.boardId}
      postId={match.params.postId}
      handleAddReplyChild={handleAddReplyChild}
    />
  );
};
export default withRouter(ReplyListContainer);
