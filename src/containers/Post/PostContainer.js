import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../../components/Post/Post';
import { loadPost } from '../../modules/post';

const PostContainer = props => {
  const { location, match } = props;
  const [moremenuEl, setMoremenuEl] = useState(null);
  const [writerEl, setWriterEl] = useState(null);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(({ post }) => ({
    data: post.loadedPost.data,
    loading: post.loadedPost.loading,
    error: post.loadedPost.error
  }));
  useEffect(() => {
    const id = match.params.postId;
    dispatch(loadPost({ id }));
  }, [location]);

  const reportFunction = () => {
    console.log('report logic');
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
    } else {
      console.log(target.id);
      if (target.id === 'writer') {
        setWriterEl(target);
      } else if (target.id === 'more') {
        setMoremenuEl(target);
      }
    }
  };

  return (
    <Post
      data={data}
      loading={loading}
      error={error}
      moremenuEl={moremenuEl}
      writerEl={writerEl}
      functionExcute={functionExcute}
      menuClick={menuClick}
    />
  );
};

export default withRouter(PostContainer);
