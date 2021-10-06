import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReplyList from '../../components/Reply/ReplyList';
import {
  initializeField,
  initializeAdd,
  initializeUpdate,
  changeField,
  loadReplyList,
  changeSecretReply,
  initializeSecret,
  initializeRemove
} from '../../modules/reply';

const ReplyListContainer = props => {
  const { location, match, history, replyReportHandle } = props;
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

  const onUpdate = replyId => {
    const { boardNameEng, postId } = match.params;
    history.push(`/board/${boardNameEng}/${postId}/update/${replyId}`);
  };

  const handleAddSuccess = () => {
    handleReplyList();
    dispatch(initializeAdd());
  };

  const handleUpdateSuccess = () => {
    handleReplyList();
    dispatch(initializeUpdate());
  };

  const handleRemoveSuccess = () => {
    handleReplyList();
    dispatch(initializeRemove());
  };

  const handleSecretSuccess = () => {
    dispatch(changeSecretReply({ parentIndex, replyIndex }));
    dispatch(initializeSecret());
  };

  useEffect(() => {
    handleReplyList();
  }, [location.search]);

  useEffect(() => {
    if (add) {
      handleAddSuccess();
    }
    if (update) {
      handleUpdateSuccess();
    }
    if (remove) {
      handleRemoveSuccess();
    }
    if (secret) {
      handleSecretSuccess();
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
      myReplyPage={myReplyPage}
      baseUrl={match.url}
      location={location}
      handleAddReplyChild={handleAddReplyChild}
      onUpdate={onUpdate}
      replyReportHandle={replyReportHandle}
    />
  );
};
export default withRouter(ReplyListContainer);
