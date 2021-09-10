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

const PostContainer = props => {
  const { location, match } = props;
  const [moremenuEl, setMoremenuEl] = useState(null);
  const [writerEl, setWriterEl] = useState(null);
  const [secretPost, setSecretPost] = useState(false);
  const [password, setPassword] = useState('');
  const [anonymousPassword, setAnonymousPassword] = useState('');
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

  const anonyPwChange = e => {
    e.preventDefault();
    const { value } = e.target;
    setAnonymousPassword(value);
  };

  const reportFunction = () => {
    console.log('report logic');
  };

  const deleteBoxHandle = () => {
    setDeleteBoxOpen(!deleteBoxOpen);
  };

  const anonymousDeleteBoxHandle = () => {
    setAnonymousDeleteBoxOpen(!anonymousDeleteBoxOpen);
  };

  const deleteFunction = () => {
    setDeleteBoxOpen(false);
    const id = match.params.postId;
    dispatch(postDelete({ id }));
  };

  const anonymousDeleteFunction = e => {
    e.preventDefault();
    setAnonymousDeleteBoxOpen(false);
    const { postId } = match.params;
    dispatch(anonymousPostDelete({ anonymousPassword, postId }));
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
        reportFunction();
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
