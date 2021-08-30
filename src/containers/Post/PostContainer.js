import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../../components/Post/Post';
import { loadPost } from '../../modules/post';

const PostContainer = props => {
  const { location, match } = props;
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

  return <Post data={data} loading={loading} error={error} />;
};

export default withRouter(PostContainer);
