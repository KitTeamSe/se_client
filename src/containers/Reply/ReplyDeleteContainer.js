import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReplyDelete from '../../components/Reply/ReplyDelete';
import { initializeRemove, removeReply } from '../../modules/reply';

const ReplyDeleteContainer = props => {
  const { replyId } = props;
  const dispatch = useDispatch();
  const { loading, error } = useSelector(({ reply }) => ({
    loading: reply.removeReply.loading,
    error: reply.removeReply.error
  }));
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(initializeRemove());
  };

  const onDelete = () => {
    dispatch(removeReply({ id: replyId }));
  };

  return (
    <ReplyDelete
      loading={loading}
      error={error}
      onDelete={onDelete}
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
    />
  );
};

export default ReplyDeleteContainer;
