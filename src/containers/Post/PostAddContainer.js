import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostAdd from '../../components/Post/PostAdd';
import { addAttachList } from '../../modules/attach';
import { searchTag, changeText, initialize } from '../../modules/tag';
import { addPost, changeField } from '../../modules/post';
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
    attachError,
    searchText,
    searchTagData,
    searchTagLoading,
    searchTagError
  } = useSelector(({ post, attach, tag }) => ({
    addForm: post.addForm,
    addLoading: post.addPost.loading,
    addError: post.addPost.error,
    addAttachData: attach.addAttach.data,
    attachLoading: attach.addAttach.loading,
    attachError: attach.addAttach.error,
    searchText: tag.searchText,
    searchTagData: tag.searchTag.data,
    searchTagLoading: tag.searchTag.loading,
    searchTagError: tag.searchTag.error
  }));
  const [tagAddMessage, setTagAddMessage] = useState('');

  const handlePostForm = (form, key, text) => {
    dispatch(changeField({ form, key, value: text }));
  };

  const handleChange = e => {
    const { id, value } = e.target;
    const form = 'addForm';
    const key = id;

    handlePostForm(form, key, value);
  };

  const handleSecret = e => {
    const { id, checked } = e.target;
    const form = 'addForm';
    const key = id;
    const value = checked ? 'SECRET' : 'NORMAL';

    handlePostForm(form, key, value);
  };

  const handleContentText = (e, editor) => {
    const form = 'addForm';
    const key = 'text';
    const value = editor.getData();

    handlePostForm(form, key, value);
  };

  const handleSearchTag = (e, value) => {
    const newSearchText = value || '';
    dispatch(changeText({ searchText: newSearchText }));
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
    const form = 'addForm';
    const key = 'attachmentList';
    const value = addForm.attachmentList.filter(e => e.attachId !== attachId);

    handlePostForm(form, key, value);
  };

  const handleEditorImg = ({ downloadUrl, fileName }) => {
    const $p = document.createElement('p');
    const $img = document.createElement('img');
    $img.setAttribute('src', downloadUrl);
    $img.setAttribute('alt', fileName);
    $p.appendChild($img);
    return $p.outerHTML;
  };

  const handleReplyImage = () => {
    const form = 'addForm';
    const attachListData = addForm.attachmentList.concat(addAttachData.data);
    const editorText = `${addForm.text}${addAttachData.data
      .filter(e => confirmFileExtension(e.fileName))
      .map(e => handleEditorImg(e))
      .join('')}`;

    handlePostForm(form, 'text', editorText);
    handlePostForm(form, 'attachmentList', attachListData);
  };

  const handleRemoveTag = tag => {
    const form = 'addForm';
    const key = 'tagList';
    const tagListData = addForm.tagList.filter(e => e.tagId !== tag.tagId);
    handlePostForm(form, key, tagListData);
  };

  const handleClearTag = () => {
    const form = 'addForm';
    const key = 'tagList';
    const tagListData = [];
    handlePostForm(form, key, tagListData);
  };

  const handleAddTag = () => {
    if (!searchText) {
      return setTagAddMessage('태그를 입력하세요.');
    }
    if (!searchTagData) {
      return setTagAddMessage('검색 결과가 없습니다.');
    }
    if (searchTagData && !searchTagData.data.find(e => e.text === searchText)) {
      return setTagAddMessage('존재하지 않는 태그입니다.');
    }
    if (addForm.tagList.find(e => e.text === searchText)) {
      return setTagAddMessage('이미 추가된 태그입니다.');
    }
    const form = 'addForm';
    const key = 'tagList';
    const newTag = searchTagData.data.find(e => e.text === searchText);
    const tagListData = newTag
      ? addForm.tagList.concat(newTag)
      : addForm.tagList;

    handlePostForm(form, key, tagListData);
    dispatch(initialize());
    return setTagAddMessage('');
  };

  useEffect(() => {
    if (addAttachData) {
      handleReplyImage();
    }
  }, [addAttachData]);

  useEffect(() => {
    if (searchText) {
      dispatch(searchTag({ text: searchText }));
    }
  }, [searchText]);

  return (
    <PostAdd
      addForm={addForm}
      addLoading={addLoading}
      addError={addError}
      attachLoading={attachLoading}
      attachError={attachError}
      searchText={searchText}
      searchTagData={searchTagData}
      searchTagLoading={searchTagLoading}
      searchTagError={searchTagError}
      tagAddMessage={tagAddMessage}
      handleChange={handleChange}
      handleSecret={handleSecret}
      handleContentText={handleContentText}
      handleAttachFiles={handleAttachFiles}
      handleSearchTag={handleSearchTag}
      handleRemoveTag={handleRemoveTag}
      handleClearTag={handleClearTag}
      handleAddTag={handleAddTag}
      onSubmit={onSubmit}
      onCancel={onCancel}
      onDeleteAttach={onDeleteAttach}
    />
  );
};

export default withRouter(PostAddContainer);
