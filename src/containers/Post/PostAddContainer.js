import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostAdd from '../../components/Post/PostAdd';
import { addAttachList } from '../../modules/attach';
import {
  searchTag,
  changeText,
  initialize as initializeTag
} from '../../modules/tag';
import {
  addPost,
  changeField,
  initialize as initializePost
} from '../../modules/post';
import confirmFileExtension from '../../utils/confirmFileExtension';
import { getDecodeHTML } from '../../utils/format';
import { errorFeedback } from '../../modules/feedback';

const PostAddContainer = props => {
  const { history, match } = props;
  const dispatch = useDispatch();
  const {
    addForm,
    addData,
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
    addData: post.addPost.data,
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

  const handlePostForm = ({ key, value }) => {
    dispatch(changeField({ form: 'addForm', key, value }));
  };

  const handleToggle = (e, values) => {
    const { id, checked } = e.target;
    handlePostForm({ key: id, value: checked ? values[0] : values[1] });
  };

  const handleSecret = e => {
    handleToggle(e, ['SECRET', 'NORMAL']);
  };

  const handleNotice = e => {
    handleToggle(e, ['NOTICE', 'NORMAL']);
  };

  const handleChange = e => {
    const { id, value } = e.target;
    handlePostForm({ key: id, value });
  };

  const handleContentText = (e, editor) => {
    handlePostForm({ key: 'text', value: editor.getData() });
  };

  const handleSearchTag = (e, value) => {
    dispatch(changeText({ searchText: value || '' }));
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
    const replaceText = getDecodeHTML(text);
    const { boardNameEng } = match.params;
    const attachIdList = attachmentList.map(attach => ({
      attachId: attach.attachId
    }));

    if (title.length < 2) {
      dispatch(errorFeedback('게시글 제목을 입력하세요.'));
      return;
    }

    if (localStorage.getItem('userId') && localStorage.getItem('token')) {
      dispatch(
        addPost({
          attachmentList: attachIdList,
          boardNameEng,
          isNotice,
          isSecret,
          postContent: { title, text: replaceText },
          tagList
        })
      );
      return;
    }

    dispatch(
      addPost({
        anonymous: { anonymousNickname, anonymousPassword },
        attachmentList: attachIdList,
        boardNameEng,
        isNotice,
        isSecret,
        postContent: { title, text: replaceText },
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
    dispatch(initializePost());
  };

  const onCancel = () => {
    onInitialize();
    onGoBack();
  };

  const onDeleteAttach = attachId => {
    handlePostForm({
      key: 'attachmentList',
      value: addForm.attachmentList.filter(e => e.attachId !== attachId)
    });
  };

  const handleEditorImg = ({ downloadUrl, fileName }) => {
    const $img = document
      .createElement('img')
      .setAttribute('src', downloadUrl)
      .setAttribute('alt', fileName);
    return document.createElement('p').appendChild($img).outerHTML;
  };

  const handleReplyImage = () => {
    handlePostForm({
      key: 'text',
      value: `${addForm.text}${addAttachData.data
        .filter(e => confirmFileExtension(e.fileName))
        .map(e => handleEditorImg(e))
        .join('')}`
    });
    handlePostForm({
      key: 'attachmentList',
      value: addForm.attachmentList.concat(addAttachData.data)
    });
  };

  const handleRemoveTag = tag => {
    handlePostForm({
      key: 'tagList',
      value: addForm.tagList.filter(e => e.tagId !== tag.tagId)
    });
  };

  const handleClearTag = () => {
    handlePostForm({ key: 'tagList', value: [] });
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
    if (addForm.tagList.find(e => e.text === searchText)) {
      return setTagAddMessage('이미 추가된 태그입니다.');
    }

    const newTag = searchTagData.data.find(e => e.text === searchText);

    handlePostForm({
      key: 'tagList',
      value: newTag ? addForm.tagList.concat(newTag) : addForm.tagList
    });
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

  useEffect(() => {
    if (addData) {
      onInitialize();
      onGoBack();
    }
  }, [addData]);

  useEffect(() => {
    onInitialize();
  }, [match.url]);

  const postTitleProps = {
    value: addForm.title,
    onChange: handleChange
  };

  const postTagAddProps = {
    value: searchText,
    tagData: addForm.tagList,
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
    data: addForm.text ? addForm.text : '',
    placeholder: '내용을 입력하세요'
  };

  const fileAttachDropZoneProps = {
    loading: attachLoading,
    error: attachError,
    handleAttachFiles
  };

  const attachImageListProps = {
    attachImgList: addForm.attachmentList.filter(e =>
      confirmFileExtension(e.fileName)
    )
  };

  const attachListProps = {
    attachList: addForm.attachmentList,
    onDeleteAttach
  };

  const postAddFooterProps = {
    addForm,
    handleChange,
    handleSecret,
    handleNotice,
    onSubmit,
    onCancel
  };

  const errorMessageProps = {
    loading: addLoading,
    error: addError
  };

  return (
    <PostAdd
      postTitleProps={postTitleProps}
      postTagAddProps={postTagAddProps}
      fileAttachDropZoneProps={fileAttachDropZoneProps}
      attachImageListProps={attachImageListProps}
      attachListProps={attachListProps}
      editorProps={editorProps}
      postAddFooterProps={postAddFooterProps}
      errorMessageProps={errorMessageProps}
    />
  );
};

export default withRouter(PostAddContainer);
