import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../../components/Post/Post';
import { loadPost } from '../../modules/post';

const PostContainer = props => {
  const { location, match } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(({ post }) => ({
    data: post.loadedPost.data,
    loading: post.loadedPost.loading,
    error: post.loadedPost.error
  }));
  useEffect(() => {
    const id = match.params.postId;
    dispatch(loadPost({ id }));
  }, [location.serarch]);

  const reportFunction = () => {
    console.log('report logic');
  };

  const banFunction = () => {
    console.log('ban logic');
  };

  const modeChange = e => {
    e.preventDefault();
    const value = e.target.id;
    if (value === 'ban') {
      banFunction();
    } else if (value === 'report') {
      reportFunction();
    }
    setAnchorEl(null);
  };

  const menuClick = e => {
    console.log(anchorEl);
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(e.currentTarget);
    }
  };

  return (
    <Post
      data={data}
      loading={loading}
      error={error}
      anchorEl={anchorEl}
      modeChange={modeChange}
      menuClick={menuClick}
    />
  );
};

export default withRouter(PostContainer);
