import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReplyAdd from '../../components/Reply/ReplyAdd';

import { changeField, addReply } from '../../modules/reply';
import {
  changeSelect,
  addAttachList,
  removeAttach,
  initializeAdd
} from '../../modules/attach';
import confirmFileExtension from '../../utils/confirmFileExtension';
import { getDecodeHTML } from '../../utils/format';

const ReplyAddContainer = props => {
  const { match } = props;
  const dispatch = useDispatch();
  const { addForm, addChildForm, addAttachData, loading, error, select } =
    useSelector(({ reply, attach }) => ({
      addForm: reply.addForm,
      addChildForm: reply.addChildForm,
      addAttachData: attach.addAttach.data,
      loading: attach.addAttach.loading,
      error: attach.addAttach.error,
      select: attach.select
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

  const handleAttachFiles = files => {
    dispatch(changeSelect({ select: 'reply' }));
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
    } = addForm;
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
        parentId: null,
        attachmentList: attachIdList
      })
    );
  };

  const onDeleteAttach = attachId => {
    const attachListData = addForm.attachmentList.filter(
      e => e.attachId !== attachId
    );

    dispatch(
      changeField({
        form: 'addForm',
        key: 'attachmentList',
        value: attachListData
      })
    );
  };

  const handleEditorImg = ({ downloadUrl, fileName }) => {
    const $p = document.createElement('p');
    const $img = document.createElement('img');
    $img.setAttribute('src', downloadUrl);
    $img.setAttribute('alt', fileName);
    $p.appendChild($img);
    return $p.outerHTML;
  };

  const handleEditorText = (form, text) => {
    dispatch(changeField({ form, key: 'text', value: text }));
  };

  const handleAttachList = (form, data) => {
    dispatch(changeField({ form, key: 'attachmentList', value: data }));
  };

  const handleReplyImage = () => {
    const form = 'addForm';
    const attachListData = addForm.attachmentList.concat(addAttachData.data);
    const editorText = `${addForm.text}${addAttachData.data
      .filter(e => confirmFileExtension(e.fileName))
      .map(e => handleEditorImg(e))
      .join('')}`;

    handleEditorText(form, editorText);
    handleAttachList(form, attachListData);
  };

  const handleReplyChildIamge = () => {
    const form = 'addChildForm';
    const attachListData = addChildForm.attachmentList.concat(
      addAttachData.data
    );
    const editorText = `${addChildForm.text}${addAttachData.data
      .filter(e => confirmFileExtension(e.fileName))
      .map(e => handleEditorImg(e))
      .join('')}`;

    handleEditorText(form, editorText);
    handleAttachList(form, attachListData);
  };

  useEffect(() => {
    if (addAttachData && select === 'reply') {
      handleReplyImage();
    }
    if (addAttachData && select === 'replyChild') {
      handleReplyChildIamge();
    }
  }, [addAttachData]);

  useEffect(() => {
    dispatch(initializeAdd());
  }, [addForm.attachmentList, addChildForm.attachmentList]);

  useEffect(() => {
    if (!addChildForm.parentId) {
      const form = 'addChildForm';
      const attachList = addChildForm.attachmentList;

      attachList.forEach(e => dispatch(removeAttach({ id: e.attachId })));
      handleEditorText(form, '');
      handleAttachList(form, []);
    }
  }, [addChildForm.parentId]);

  return (
    <>
      <ReplyAdd
        loading={loading}
        error={error}
        addForm={addForm}
        handleChange={handleChange}
        handleSecret={handleSecret}
        handleContentText={handleContentText}
        handleAttachFiles={handleAttachFiles}
        onSubmit={onSubmit}
        onDeleteAttach={onDeleteAttach}
      />
    </>
  );
};

export default withRouter(ReplyAddContainer);
