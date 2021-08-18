import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReplyAdd from '../../components/Reply/ReplyAdd';

import { changeField, addReply } from '../../modules/reply';

const ReplyAddContainer = props => {
  const { location, match } = props;
  const dispatch = useDispatch();
  const { addForm, add } = useSelector(({ reply }) => ({
    addForm: reply.addForm,
    add: reply.addReply
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

  const handleContentText = value => {
    dispatch(
      changeField({
        form: 'addForm',
        key: 'text',
        value
      })
    );
  };

  const onSubmit = e => {
    e.preventDefault();
    const { anonymousNickname, anonymousPassword, isSecret, text, files } =
      addForm;
    const anonymous = { anonymousNickname, anonymousPassword };
    const { postId } = match.params;
    const parentId = null;
    console.log(add);
    dispatch(addReply({ anonymous, isSecret, text, postId, parentId, files }));
  };

  useEffect(() => {
    console.log(location);
    console.log(match);
  }, []);

  return (
    <ReplyAdd
      handleChange={handleChange}
      handleSecret={handleSecret}
      handleContentText={handleContentText}
      onSubmit={onSubmit}
    />
  );
};
export default withRouter(ReplyAddContainer);
