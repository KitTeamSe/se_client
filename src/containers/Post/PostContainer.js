import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import Post from '../../components/Post/Post';
import {
  loadPost,
  loadSecretPost,
  postDelete,
  anonymousPostDelete,
  initialize
} from '../../modules/post';
import DeleteAlertDialog from '../../components/Post/DeleteAlertDialog';
import AnonymousDeleteDialog from '../../components/Post/AnonymousDeleteDialog';
import PostReportDialog from '../../components/Post/PostReportDialog';

const PostContainer = props => {
  const { location, match } = props;
  const [moremenuEl, setMoremenuEl] = useState(null);
  const [writerEl, setWriterEl] = useState(null);
  const [secretPost, setSecretPost] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [anonymousPassword, setAnonymousPassword] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [reportTypeSelect, setReportTypeSelect] = useState('POST');
  const dispatch = useDispatch();
  const {
    data,
    loading,
    error,
    postDeleteData,
    postDeleteLoading,
    postDeleteError
  } = useSelector(({ post }) => ({
    data: post.loadedPost.data,
    loading: post.loadedPost.loading,
    error: post.loadedPost.error,
    postDeleteData: post.postDeleteRes.data,
    postDeleteLoading: post.postDeleteRes.loading,
    postDeleteError: post.postDeleteRes.error
  }));
  const [deleteBoxOpen, setDeleteBoxOpen] = useState(false);
  const [anonymousDeleteBoxOpen, setAnonymousDeleteBoxOpen] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    window.scrollTo(0, 0);
    setPassword('');
    setAnonymousPassword('');
    const { secret } = qs.parse(location.search, {
      ignoreQueryPrefix: true
    });
    setSecretPost(Boolean(secret));
    const id = Number(match.params.postId);
    if (!secret) {
      dispatch(loadPost({ id }));
    } else {
      dispatch(initialize('loadedPost'));
    }
  }, [match.params.postId]);

  // 비밀글 관련
  const PasswordSubmit = e => {
    e.preventDefault();
    const postId = Number(match.params.postId);
    dispatch(loadSecretPost({ postId, password }));
  };

  const onChange = e => {
    e.preventDefault();
    const { value } = e.target;
    setPassword(value);
  };

  // 익명게시글 삭제 관련
  const anonymousDeleteFunction = e => {
    e.preventDefault();
    setAnonymousDeleteBoxOpen(false);
    const { postId } = match.params;
    dispatch(anonymousPostDelete({ anonymousPassword, postId }));
  };

  const anonyPwChange = e => {
    e.preventDefault();
    const { value } = e.target;
    setAnonymousPassword(value);
  };

  const anonymousDeleteBoxHandle = () => {
    setAnonymousDeleteBoxOpen(!anonymousDeleteBoxOpen);
  };

  // 일반 삭제 관련
  const deleteBoxHandle = () => {
    setDeleteBoxOpen(!deleteBoxOpen);
  };

  const deleteFunction = () => {
    setDeleteBoxOpen(false);
    const id = match.params.postId;
    dispatch(postDelete({ id }));
  };

  // 신고 관련
  const reportBoxHandle = () => {
    setReportOpen(!reportOpen);
  };

  const descriptionChange = e => {
    e.preventDefault();
    const { value } = e.target;
    setReportDescription(value);
  };

  const reportTypeChange = e => {
    e.preventDefault();
    const { value } = e.target;
    setReportTypeSelect(value);
  };

  const reportSubmit = e => {
    e.preventDefault();
    console.log(reportTypeSelect, reportDescription);
    setReportOpen(false);
    setReportDescription('');
    setReportTypeSelect('POST');
  };

  const banFunction = () => {
    console.log('ban logic');
  };

  const messageFunction = () => {
    console.log('message logic');
  };

  const profileFunction = () => {
    console.log('profile logic');
  };
  const mailFunction = () => {
    console.log('mail logic');
  };
  const postFunction = () => {
    console.log('post logic');
  };

  const functionExcute = e => {
    e.preventDefault();
    const value = e.target.id;
    switch (value) {
      case 'ban':
        banFunction();
        break;
      case 'report':
        reportBoxHandle();
        break;
      case 'message':
        messageFunction();
        break;
      case 'profile':
        profileFunction();
        break;
      case 'mail':
        mailFunction();
        break;
      case 'post':
        postFunction();
        break;
      case 'delete':
        deleteBoxHandle();
        break;
      case 'anonyDelete':
        anonymousDeleteBoxHandle();
        break;
      default:
        console.log('not selected');
    }
    setWriterEl(null);
    setMoremenuEl(null);
  };

  const menuClick = e => {
    const target = e.currentTarget;
    if (moremenuEl || writerEl) {
      setMoremenuEl(null);
      setWriterEl(null);
    } else if (target.id === 'writer') {
      setWriterEl(target);
    } else if (target.id === 'more') {
      setMoremenuEl(target);
    }
  };

  return (
    <>
      <PostReportDialog
        reportOpen={reportOpen}
        reportBoxHandle={reportBoxHandle}
        reportSubmit={reportSubmit}
        reportDescription={reportDescription}
        descriptionChange={descriptionChange}
        reportTypeChange={reportTypeChange}
        reportTypeSelect={reportTypeSelect}
      />
      <DeleteAlertDialog
        deleteBoxOpen={deleteBoxOpen}
        deleteBoxHandle={deleteBoxHandle}
        deleteFunction={deleteFunction}
      />
      <AnonymousDeleteDialog
        anonymousDeleteBoxOpen={anonymousDeleteBoxOpen}
        anonymousDeleteBoxHandle={anonymousDeleteBoxHandle}
        anonymousDeleteFunction={anonymousDeleteFunction}
        anonyPwChange={anonyPwChange}
        anonymousPassword={anonymousPassword}
      />
      <Post
        data={data}
        loading={loading}
        error={error}
        moremenuEl={moremenuEl}
        writerEl={writerEl}
        secretPost={secretPost}
        password={password}
        userId={userId}
        postDeleteData={postDeleteData}
        postDeleteLoading={postDeleteLoading}
        postDeleteError={postDeleteError}
        onChange={onChange}
        functionExcute={functionExcute}
        menuClick={menuClick}
        PasswordSubmit={PasswordSubmit}
      />
    </>
  );
};

export default withRouter(PostContainer);
