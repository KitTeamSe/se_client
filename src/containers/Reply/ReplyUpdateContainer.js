import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReplyUpdate from '../../components/Reply/ReplyUpdate';
import { addAttachList } from '../../modules/attach';
import {
  changeField,
  changeUpdate,
  initialize,
  loadReplyById,
  updateReply
} from '../../modules/reply';
import confirmFileExtension from '../../utils/confirmFileExtension';
import { getDecodeHTML, getEncodeHTML } from '../../utils/format';

const ReplyUpdateContainer = props => {
  const { location, match, history } = props;
  const dispatch = useDispatch();
  const {
    updateForm,
    replyData,
    addAttachData,
    attachLoading,
    attachError,
    updateData,
    updateLoading,
    updateError
  } = useSelector(({ reply, attach }) => ({
    updateForm: reply.updateForm,
    replyData: reply.loadReplyById.data,
    addAttachData: attach.addAttach.data,
    attachLoading: attach.addAttach.loading,
    attachError: attach.addAttach.error,
    updateData: reply.updateReply.data,
    updateLoading: reply.updateReply.loading,
    updateError: reply.updateReply.error
  }));

  const handleChange = e => {
    const { id, value } = e.target;

    dispatch(
      changeField({
        form: 'updateForm',
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
        form: 'updateForm',
        key: id,
        value
      })
    );
  };

  const handleContentText = (e, editor) => {
    const value = editor.getData();

    dispatch(
      changeField({
        form: 'updateForm',
        key: 'text',
        value
      })
    );
  };

  const handleAttachFiles = files => {
    dispatch(addAttachList({ files }));
  };

  const handleUpdateForm = () => {
    const { text, attacheList, isSecret } = replyData.data;
    const replaceText = getEncodeHTML(text);

    dispatch(
      changeUpdate({ text: replaceText, attachmentList: attacheList, isSecret })
    );
  };

  const handleReply = () => {
    const { replyId } = match.params;

    dispatch(loadReplyById({ replyId }));
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
    const form = 'updateForm';
    const attachListData = updateForm.attachmentList.concat(addAttachData.data);
    const editorText = `${updateForm.text}${addAttachData.data
      .filter(e => confirmFileExtension(e.fileName))
      .map(e => handleEditorImg(e))
      .join('')}`;

    handleEditorText(form, editorText);
    handleAttachList(form, attachListData);
  };

  const onSubmit = e => {
    e.preventDefault();
    const { password, isSecret, text, attachmentList } = updateForm;
    const { replyId } = match.params;
    const replaceText = getDecodeHTML(text);
    const attachIdList = attachmentList.map(attach => ({
      attachId: attach.attachId
    }));

    dispatch(
      updateReply({
        password,
        isSecret,
        replyId,
        text: replaceText,
        attachmentList: attachIdList
      })
    );
  };

  const onGoBack = () => {
    const { boardNameEng, postId } = match.params;
    history.push(`/board/${boardNameEng}/${postId}`);
  };

  const onCancel = () => {
    dispatch(initialize());
    onGoBack();
  };

  const onDeleteAttach = attachId => {
    const attachListData = updateForm.attachmentList.filter(
      e => e.attachId !== attachId
    );

    dispatch(
      changeField({
        form: 'updateForm',
        key: 'attachmentList',
        value: attachListData
      })
    );
  };

  useEffect(() => {
    handleReply();
    console.log(match);
    console.log(location);
    console.log(history);
  }, [location.search]);

  useEffect(() => {
    if (replyData) {
      handleUpdateForm();
    }
  }, [replyData]);

  useEffect(() => {
    if (addAttachData) {
      handleReplyImage();
    }
  }, [addAttachData]);

  useEffect(() => {
    if (updateData) {
      onGoBack();
    }
  }, [updateData]);

  return (
    <ReplyUpdate
      replyData={replyData}
      updateForm={updateForm}
      attachLoading={attachLoading}
      attachError={attachError}
      updateLoading={updateLoading}
      updateError={updateError}
      handleChange={handleChange}
      handleSecret={handleSecret}
      handleContentText={handleContentText}
      handleAttachFiles={handleAttachFiles}
      onSubmit={onSubmit}
      onCancel={onCancel}
      onDeleteAttach={onDeleteAttach}
    />
  );
};

export default withRouter(ReplyUpdateContainer);
