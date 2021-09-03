import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReplyAdd from '../../components/Reply/ReplyAdd';

import { changeField, addReply } from '../../modules/reply';
import { addAttachList, initializeAdd } from '../../modules/attach';

const ReplyAddContainer = props => {
  const { match } = props;
  const dispatch = useDispatch();
  const { addForm, addAttachData, loading, error, attachList } = useSelector(
    ({ reply, attach }) => ({
      addForm: reply.addForm,
      addAttachData: attach.addAttach.data,
      loading: attach.addAttach.loading,
      error: attach.addAttach.error,
      attachList: attach.attachList
    })
  );

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

  const handleAttachFiles = files => {
    dispatch(addAttachList({ multipartFile: files }));
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

  const handleEditorImg = ({ downloadUrl, fileName }) =>
    `<p><img src="${downloadUrl}" alt="${fileName}"></p>`;

  useEffect(() => {
    if (addAttachData) {
      const text = `${addForm.text}${addAttachData.data
        .map(e => handleEditorImg(e))
        .join('')}`;
      const attachId = addAttachData.data.map(e => e.attachId);

      dispatch(
        changeField({
          form: 'addForm',
          key: 'text',
          value: text
        })
      );

      dispatch(
        changeField({
          form: 'addForm',
          key: 'files',
          value: attachId
        })
      );
      dispatch(initializeAdd());
    }
  }, [addAttachData]);

  return (
    <>
      <ReplyAdd
        attachList={attachList}
        addForm={addForm}
        handleChange={handleChange}
        handleSecret={handleSecret}
        handleContentText={handleContentText}
        onSubmit={onSubmit}
        loading={loading}
        error={error}
        handleAttachFiles={handleAttachFiles}
      />
    </>
  );
};

export default withRouter(ReplyAddContainer);
