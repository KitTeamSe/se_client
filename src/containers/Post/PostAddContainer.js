import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostAdd from '../../components/Post/PostAdd';
import { addAttachList } from '../../modules/attach';
import { addPost, changeField, initialize } from '../../modules/post';
import confirmFileExtension from '../../utils/confirmFileExtension';
import { getDecodeHTML } from '../../utils/format';

const PostAddContainer = props => {
  const { history, match } = props;
  const dispatch = useDispatch();
  const {
    addForm,
    addLoading,
    addError,
    addAttachData,
    attachLoading,
    attachError
  } = useSelector(({ post, attach }) => ({
    addForm: post.addForm,
    addLoading: post.addPost.loading,
    addError: post.addPost.error,
    addAttachData: attach.addAttach.data,
    attachLoading: attach.addAttach.loading,
    attachError: attach.addAttach.error
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
    dispatch(addAttachList({ files }));
  };

  const onSubmit = e => {
    e.preventDefault();
    const {
      anonymousNickname,
      anonymousPassword,
      isNotice,
      isSecret,
      text,
      title,
      tagList,
      attachmentList
    } = addForm;
    const anonymous = { anonymousNickname, anonymousPassword };
    const replaceText = getDecodeHTML(text);
    const postContent = { title, text: replaceText };
    const { boardNameEng } = match.params;
    const attachIdList = attachmentList.map(attach => ({
      attachId: attach.attachId
    }));

    dispatch(
      addPost({
        anonymous,
        attachmentList: attachIdList,
        boardNameEng,
        isNotice,
        isSecret,
        postContent,
        tagList
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

  useEffect(() => {
    if (addAttachData) {
      handleReplyImage();
    }
  }, [addAttachData]);

  return (
    <PostAdd
      addForm={addForm}
      addLoading={addLoading}
      addError={addError}
      attachLoading={attachLoading}
      attachError={attachError}
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

export default withRouter(PostAddContainer);
