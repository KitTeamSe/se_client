import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReplyAdd from '../../components/Reply/ReplyAdd';

import { changeField, addReply } from '../../modules/reply';

const ReplyAddContainer = props => {
  const { match } = props;
  const dispatch = useDispatch();
  const { addForm } = useSelector(({ reply }) => ({
    addForm: reply.addForm
  }));

  const handleChange = e => {
    const { id, value } = e.target;

    dispatch(
      changeField({
        form: 'addForm',
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
        form: 'addForm',
        key: id,
        value
      })
    );
  };

  const handleContentText = (e, editor) => {
    const value = editor.getData();

    dispatch(
      changeField({
        form: 'addForm',
        key: 'text',
        value
      })
    );
  };

  const onFocus = (e, editor) => {
    editor.setData(addForm.text);
  };

  const onSubmit = e => {
    e.preventDefault();
    const { anonymousNickname, anonymousPassword, isSecret, text, files } =
      addForm;
    const anonymous = { anonymousNickname, anonymousPassword };
    const { postId } = match.params;
    const parentId = null;
    dispatch(addReply({ anonymous, isSecret, text, postId, parentId, files }));
  };

  return (
    <ReplyAdd
      addForm={addForm}
      handleChange={handleChange}
      handleSecret={handleSecret}
      handleContentText={handleContentText}
      onFocus={onFocus}
      onSubmit={onSubmit}
    />
  );
};

export default withRouter(ReplyAddContainer);
