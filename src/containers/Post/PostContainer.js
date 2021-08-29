import React from 'react';
import { withRouter } from 'react-router-dom';
import Post from '../../components/Post/Post';

const PostContainer = () => {
  // const { location, match } = props;
  // console.log(location, match);

  return <Post />;
};

export default withRouter(PostContainer);
