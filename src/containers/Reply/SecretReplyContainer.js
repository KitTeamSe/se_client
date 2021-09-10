import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SecretReply from '../../components/Reply/SecretReply';
import {
  changeField,
  initializeSecret,
  loadSecretReply
} from '../../modules/reply';

const SecretReplyContainer = props => {
  const { replyId, parentIndex = '', replyIndex = '' } = props;
  const dispatch = useDispatch();
  const { loading, error, loadSecretForm } = useSelector(({ reply }) => ({
    loading: reply.loadSecretReply.loading,
    error: reply.loadSecretReply.error,
    loadSecretForm: reply.loadSecretForm
  }));
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    dispatch(
      changeField({
        form: 'loadSecretForm',
        key: 'parentIndex',
        value: parentIndex
      })
    );
    dispatch(
      changeField({
        form: 'loadSecretForm',
        key: 'replyIndex',
        value: replyIndex
      })
    );
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(initializeSecret());
  };

  const handleChange = e => {
    const { id, value } = e.target;

    dispatch(
      changeField({
        form: 'loadSecretForm',
        key: id,
        value
      })
    );
  };

  const onSubmit = e => {
    e.preventDefault();
    const { password } = loadSecretForm;
    dispatch(loadSecretReply({ password, replyId }));
  };

  return (
    <SecretReply
      loadSecretForm={loadSecretForm}
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

export default SecretReplyContainer;
