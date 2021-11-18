import React from 'react';
import { MainWrapper } from '../components/Common/Wrapper/Wrapper';
import BoardHeadContainer from '../containers/Board/BoardHeadContainer';
import BoardPaginationContainer from '../containers/Board/BoardPaginationContainer';
import BoardPostListContainer from '../containers/Board/BoardPostListContainer';
import PostContainer from '../containers/Post/PostContainer';
import ReplyListContainer from '../containers/Reply/ReplyListContainer';
import ReplyPaginationContainer from '../containers/Reply/ReplyPaginationContainer';
import ReportDialogContainer from '../containers/Report/ReportDialogContainer';
import ReplyAddContainer from '../containers/Reply/ReplyAddContainer';

const PostPage = () => {
  return (
    <>
      <MainWrapper>
        <PostContainer />
        <ReplyListContainer>
          <ReplyAddContainer />
        </ReplyListContainer>
        <ReplyPaginationContainer />
        <ReportDialogContainer />
      </MainWrapper>
      <MainWrapper>
        <BoardHeadContainer />
        <BoardPostListContainer />
        <BoardPaginationContainer />
      </MainWrapper>
    </>
  );
};

export default PostPage;
