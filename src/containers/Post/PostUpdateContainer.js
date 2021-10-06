import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostUpdate from '../../components/Post/PostUpdate';
import { addAttachList } from '../../modules/attach';
import {
  searchTag,
  changeText,
  initialize as initializeTag
} from '../../modules/tag';
import {
  updatePost,
  changeField,
  initialize as initializePost,
  loadPost
} from '../../modules/post';
import confirmFileExtension from '../../utils/confirmFileExtension';
import { getDecodeHTML, getEncodeHTML } from '../../utils/format';

const PostUpdateContainer = props => {
  const { history, match, location } = props;
  const dispatch = useDispatch();
  const {
    loadedPostData,
    updateForm,
    updateData,
    updateLoading,
    updateError,
    addAttachData,
    attachLoading,
    attachError,
    searchText,
    searchTagData,
    searchTagLoading,
    searchTagError
  } = useSelector(({ post, attach, tag }) => ({
    loadedPostData: post.loadedPost.data,
    updateForm: post.updateForm,
    updateData: post.updatePost.data,
    updateLoading: post.updatePost.loading,
    updateError: post.updatePost.error,
    addAttachData: attach.addAttach.data,
    attachLoading: attach.addAttach.loading,
    attachError: attach.addAttach.error,
    searchText: tag.searchText,
    searchTagData: tag.searchTag.data,
    searchTagLoading: tag.searchTag.loading,
    searchTagError: tag.searchTag.error
  }));
  const [tagAddMessage, setTagAddMessage] = useState('');

  const handlePost = () => {
    const { postId } = match.params;
    const id = postId;

    dispatch(loadPost({ id }));
  };

  const handlePostForm = (form, key, value) => {
    dispatch(changeField({ form, key, value }));
  };

  const handleUpdateForm = () => {
    const { postContent, attaches, tags, isNotice, isSecret } =
      loadedPostData.data;
    const attachmentList = attaches;
    const tagList = tags.map(e => ({ tagId: e.tagId, text: e.tag }));
    const { title, text } = postContent;
    const replaceText = getEncodeHTML(text);
    const form = 'updateForm';

    handlePostForm(form, 'attachmentList', attachmentList);
    handlePostForm(form, 'isNotice', isNotice);
    handlePostForm(form, 'isSecret', isSecret);
    handlePostForm(form, 'title', title);
    handlePostForm(form, 'text', replaceText);
    handlePostForm(form, 'tagList', tagList);
  };

  const handleToggle = (e, values) => {
    const { id, checked } = e.target;
    const form = 'updateForm';
    const key = id;
    const value = checked ? values[0] : values[1];

    handlePostForm(form, key, value);
  };

  const handleChange = e => {
    const { id, value } = e.target;
    const form = 'updateForm';
    const key = id;

    handlePostForm(form, key, value);
  };

  const handleSecret = e => {
    handleToggle(e, ['SECRET', 'NORMAL']);
  };

  const handleNotice = e => {
    handleToggle(e, ['NOTICE', 'NORMAL']);
  };

  const handleContentText = (e, editor) => {
    const form = 'updateForm';
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
    const { postId } = match.params;
    const {
      anonymousPassword,
      isNotice,
      isSecret,
      text,
      title,
      tagList,
      attachmentList
    } = updateForm;
    const replaceText = getDecodeHTML(text);
    const postContent = { title, text: replaceText };
    const attachIdList = attachmentList.map(attach => ({
      attachId: attach.attachId
    }));

    dispatch(
      updatePost({
        postId,
        anonymousPassword,
        attachmentList: attachIdList,
        isNotice,
        isSecret,
        postContent,
        tagList
      })
    );
  };

  const onGoBack = () => {
    history.goBack();
  };

  const onInitialize = () => {
    dispatch(initializeTag());
    dispatch(initializePost());
  };

  const onCancel = () => {
    onInitialize();
    onGoBack();
  };

  const onDeleteAttach = attachId => {
    const form = 'updateForm';
    const key = 'attachmentList';
    const value = updateForm.attachmentList.filter(
      e => e.attachId !== attachId
    );

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
    const form = 'updateForm';
    const attachListData = updateForm.attachmentList.concat(addAttachData.data);
    const editorText = `${updateForm.text}${addAttachData.data
      .filter(e => confirmFileExtension(e.fileName))
      .map(e => handleEditorImg(e))
      .join('')}`;

    handlePostForm(form, 'text', editorText);
    handlePostForm(form, 'attachmentList', attachListData);
  };

  const handleRemoveTag = tag => {
    const form = 'updateForm';
    const key = 'tagList';
    const tagListData = updateForm.tagList.filter(e => e.tagId !== tag.tagId);
    handlePostForm(form, key, tagListData);
  };

  const handleClearTag = () => {
    const form = 'updateForm';
    const key = 'tagList';
    const tagListData = [];
    handlePostForm(form, key, tagListData);
    dispatch(changeText({ searchText: '' }));
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
    if (updateForm.tagList.find(e => e.text === searchText)) {
      return setTagAddMessage('이미 추가된 태그입니다.');
    }
    const form = 'updateForm';
    const key = 'tagList';
    const newTag = searchTagData.data.find(e => e.text === searchText);
    const tagListData = newTag
      ? updateForm.tagList.concat(newTag)
      : updateForm.tagList;

    handlePostForm(form, key, tagListData);
    return setTagAddMessage('');
  };

  useEffect(() => {
    handlePost();
  }, [location.search]);

  useEffect(() => {
    if (loadedPostData) {
      handleUpdateForm();
    }
  }, [loadedPostData]);

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

  useEffect(() => {
    if (updateData) {
      onInitialize();
      onGoBack();
    }
  }, [updateData]);

  const postTitleProps = {
    value: updateForm.title,
    onChange: handleChange
  };

  const postTagAddProps = {
    isAccountPost: loadedPostData ? loadedPostData.data.accountIdString : null,
    value: searchText,
    tagData: updateForm.tagList,
    searchTagData,
    searchTagLoading,
    searchTagError,
    tagAddMessage,
    handleAddTag,
    handleSearchTag,
    handleRemoveTag,
    handleClearTag
  };

  const editorProps = {
    onChange: handleContentText,
    data: updateForm.text,
    placeholder: '내용을 입력하세요'
  };

  const fileAttachDropZoneProps = {
    loading: attachLoading,
    error: attachError,
    handleAttachFiles
  };

  const attachImageListProps = {
    attachImgList: updateForm.attachmentList.filter(e =>
      confirmFileExtension(e.fileName)
    )
  };

  const attachListProps = {
    attachList: updateForm.attachmentList,
    onDeleteAttach
  };

  const postUpdateFooterProps = {
    isAccountPost: loadedPostData ? loadedPostData.data.accountIdString : null,
    updateForm,
    handleChange,
    handleSecret,
    handleNotice,
    onSubmit,
    onCancel
  };

  const errorMessageProps = {
    loading: updateLoading,
    error: updateError
  };

  return (
    <PostUpdate
      postTitleProps={postTitleProps}
      postTagAddProps={postTagAddProps}
      fileAttachDropZoneProps={fileAttachDropZoneProps}
      attachImageListProps={attachImageListProps}
      attachListProps={attachListProps}
      editorProps={editorProps}
      postUpdateFooterProps={postUpdateFooterProps}
      errorMessageProps={errorMessageProps}
    />
  );
};

export default withRouter(PostUpdateContainer);
