import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReplyChildAdd from '../../components/Reply/ReplyChildAdd';

import { changeField, addReply } from '../../modules/reply';
import {
  addAttachList,
  changeSelect,
  removeAttach
} from '../../modules/attach';
import { getDecodeHTML } from '../../utils/format';

const ReplyChildAddContainer = props => {
  const { parentId, match } = props;
  const dispatch = useDispatch();
  const { addChildForm, loading, error } = useSelector(({ reply, attach }) => ({
    addChildForm: reply.addChildForm,
    loading: attach.addAttach.loading,
    error: attach.addAttach.errord
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

  const handleAttachFiles = files => {
    dispatch(changeSelect({ select: 'replyChild' }));
    dispatch(addAttachList({ files }));
  };

  const onSubmit = e => {
    e.preventDefault();
    const {
      anonymousNickname,
      anonymousPassword,
      isSecret,
      text,
      attachmentList
    } = addChildForm;
    const anonymous = { anonymousNickname, anonymousPassword };
    const { postId } = match.params;
    const replaceText = getDecodeHTML(text);
    const attachIdList = attachmentList.map(attach => ({
      attachId: attach.attachId
    }));
    dispatch(
      addReply({
        anonymous,
        isSecret,
        text: replaceText,
        postId,
        parentId,
        attachmentList: attachIdList
      })
    );
  };

  const onDeleteAttach = attachId => {
    const attachListData = addChildForm.attachmentList.filter(
      e => e.attachId !== attachId
    );

    dispatch(
      changeField({
        form: 'addChildForm',
        key: 'attachmentList',
        value: attachListData
      })
    );
    dispatch(removeAttach({ id: attachId }));
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
        loading={loading}
        error={error}
        addChildForm={addChildForm}
        handleChange={handleChange}
        handleSecret={handleSecret}
        handleContentText={handleContentText}
        onSubmit={onSubmit}
        onCancel={onCancel}
        onDeleteAttach={onDeleteAttach}
        handleAttachFiles={handleAttachFiles}
      />
    )
  );
};

export default withRouter(ReplyChildAddContainer);
