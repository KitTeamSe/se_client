import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import Post from '../../components/Post/Post';
import { loadPost, loadSecretPost, initialize } from '../../modules/post';
import { postDelete } from '../../libs/api/post';

const PostContainer = props => {
  const { location, match } = props;
  const [moremenuEl, setMoremenuEl] = useState(null);
  const [writerEl, setWriterEl] = useState(null);
  const [secretPost, setSecretPost] = useState(false);
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(({ post }) => ({
    data: post.loadedPost.data,
    loading: post.loadedPost.loading,
    error: post.loadedPost.error
  }));

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    setPassword('');
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

  const reportFunction = () => {
    console.log('report logic');
  };

  const deleteFunction = () => {
    console.log('delete logic');
    const id = match.params.postId;
    console.log(id);
    postDelete({ id });
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
        deleteFunction();
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
    <Post
      data={data}
      loading={loading}
      error={error}
      moremenuEl={moremenuEl}
      writerEl={writerEl}
      secretPost={secretPost}
      functionExcute={functionExcute}
      menuClick={menuClick}
      PasswordSubmit={PasswordSubmit}
      password={password}
      onChange={onChange}
      userId={userId}
    />
  );
};

export default withRouter(PostContainer);
