import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReplyAnonyDelete from '../../components/Reply/ReplyAnonyDelete';
import {
  changeField,
  initializeRemove,
  removeReplyAnony
} from '../../modules/reply';

const ReplyAnonyDeleteContainer = props => {
  const { replyId } = props;
  const dispatch = useDispatch();
  const { loading, error, removeForm } = useSelector(({ reply }) => ({
    loading: reply.removeReply.loading,
    error: reply.removeReply.error,
    removeForm: reply.removeForm
  }));
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(initializeRemove());
  };

  const handleChange = e => {
    const { id, value } = e.target;

    dispatch(
      changeField({
        form: 'removeForm',
        key: id,
        value
      })
    );
  };

  const onSubmit = e => {
    e.preventDefault();
    const { password } = removeForm;
    dispatch(removeReplyAnony({ password, replyId }));
  };

  return (
    <ReplyAnonyDelete
      removeForm={removeForm}
      loading={loading}
      error={error}
      onSubmit={onSubmit}
      open={open}
      handleChange={handleChange}
      handleOpen={handleOpen}
      handleClose={handleClose}
    />
  );
};

export default ReplyAnonyDeleteContainer;
