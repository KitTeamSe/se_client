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
  initializeForm as initializePostForm
} from '../../modules/post';
import confirmFileExtension from '../../utils/confirmFileExtension';
import { getDecodeHTML } from '../../utils/format';

const PostUpdateContainer = props => {
  const { history, match } = props;
  const dispatch = useDispatch();
  const {
    updateForm,
    updateLoading,
    updateError,
    updateAttachData,
    attachLoading,
    attachError,
    searchText,
    searchTagData,
    searchTagLoading,
    searchTagError
  } = useSelector(({ post, attach, tag }) => ({
    updateForm: post.updateForm,
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
  const [tagUpdateMessage, setTagUpdateMessage] = useState('');

  const handlePostForm = (form, key, value) => {
    dispatch(changeField({ form, key, value }));
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
    const {
      anonymousNickname,
      anonymousPassword,
      isNotice,
      isSecret,
      text,
      title,
      tagList,
      attachmentList
    } = updateForm;
    const anonymous = { anonymousNickname, anonymousPassword };
    const replaceText = getDecodeHTML(text);
    const postContent = { title, text: replaceText };
    const { boardNameEng } = match.params;
    const attachIdList = attachmentList.map(attach => ({
      attachId: attach.attachId
    }));

    dispatch(
      updatePost({
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
    const { boardNameEng } = match.params;
    history.push(`/board/${boardNameEng}`);
  };

  const onInitialize = () => {
    dispatch(initializeTag());
    dispatch(initializePostForm());
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
    const attachListData = updateForm.attachmentList.concat(
      updateAttachData.data
    );
    const editorText = `${updateForm.text}${updateAttachData.data
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

  const handleUpdateTag = () => {
    if (!searchText) {
      return setTagUpdateMessage('태그를 입력하세요.');
    }
    if (!searchTagData) {
      return setTagUpdateMessage('검색 결과가 없습니다.');
    }
    if (searchTagData && !searchTagData.data.find(e => e.text === searchText)) {
      return setTagUpdateMessage('존재하지 않는 태그입니다.');
    }
    if (updateForm.tagList.find(e => e.text === searchText)) {
      return setTagUpdateMessage('이미 추가된 태그입니다.');
    }
    const form = 'updateForm';
    const key = 'tagList';
    const newTag = searchTagData.data.find(e => e.text === searchText);
    const tagListData = newTag
      ? updateForm.tagList.concat(newTag)
      : updateForm.tagList;

    handlePostForm(form, key, tagListData);
    return setTagUpdateMessage('');
  };

  useEffect(() => {
    if (updateAttachData) {
      handleReplyImage();
    }
  }, [updateAttachData]);

  useEffect(() => {
    if (searchText) {
      dispatch(searchTag({ text: searchText }));
    }
  }, [searchText]);

  useEffect(() => {
    return onInitialize();
  }, []);

  const postTitleProps = {
    value: updateForm.title,
    onChange: handleChange
  };

  const postTagAddProps = {
    value: searchText,
    tagData: updateForm.tagList,
    searchTagData,
    searchTagLoading,
    searchTagError,
    tagUpdateMessage,
    handleUpdateTag,
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
