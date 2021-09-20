import React from 'react';
import styled from 'styled-components';
import BoardContainer from '../containers/Board/BoardContainer';
import PostContainer from '../containers/Post/PostContainer';

const MainWrapper = styled.div`
  margin: auto;
  margin-top: 3rem;
  width: 70vw;
  max-width: 100%;
  padding: 1.5rem;
  display: display;
  align-items: center;
  background-color: #ffffff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  @media ${props => props.theme.mobile} {
    width: calc(100vw - 1rem);
    margin-top: 1rem;
    padding: 0;
  }
`;
const PostPage = () => {
  return (
    <>
      <MainWrapper>
        <PostContainer />
      </MainWrapper>
      <MainWrapper>
        <BoardContainer />
      </MainWrapper>
    </>
  );
};

export default PostPage;
