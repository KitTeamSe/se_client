import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReplyChildAdd from '../../components/Reply/ReplyChildAdd';

import { changeField, addReply } from '../../modules/reply';

const ReplyChildAddContainer = props => {
  const { parentId, match } = props;
  const dispatch = useDispatch();
  const { addChildForm } = useSelector(({ reply }) => ({
    addChildForm: reply.addChildForm
  }));

  const handleChange = e => {
    const { id, value } = e.target;

    dispatch(
      changeField({
        form: 'addChildForm',
        key: id,
        value
      })
    );
  };

  const handleSecret = e => {
    const { id, checked } = e.target;
    const value = checked ? 'SECRET' : 'NORMAL';

    dispatch(
      changeField({
        form: 'addChildForm',
        key: id,
        value
      })
    );
  };

  const handleContentText = (e, editor) => {
    const value = editor.getData();

    dispatch(
      changeField({
        form: 'addChildForm',
        key: 'text',
        value
      })
    );
  };

  const onFocus = (e, editor) => {
    editor.setData(addChildForm.text);
  };

  const onSubmit = e => {
    e.preventDefault();
    const { anonymousNickname, anonymousPassword, isSecret, text, files } =
      addChildForm;
    const anonymous = { anonymousNickname, anonymousPassword };
    const { postId } = match.params;
    dispatch(addReply({ anonymous, isSecret, text, postId, parentId, files }));
  };

  const onCancel = () => {
    dispatch(
      changeField({
        form: 'addChildForm',
        key: 'parentId',
        value: ''
      })
    );
  };

  return (
    addChildForm &&
    addChildForm.parentId === parentId && (
      <ReplyChildAdd
        addChildForm={addChildForm}
        handleChange={handleChange}
        handleSecret={handleSecret}
        handleContentText={handleContentText}
        onFocus={onFocus}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    )
  );
};

export default withRouter(ReplyChildAddContainer);
