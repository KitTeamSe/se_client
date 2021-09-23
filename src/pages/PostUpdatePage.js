import React from 'react';
import styled from 'styled-components';
import PostUpdateContainer from '../containers/Post/PostUpdateContainer';

const ContentWrapper = styled.div`
  margin-top: 3rem;
  width: calc(100% - 4rem);
  padding: 2rem;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  @media ${props => props.theme.mobile} {
    width: calc(100% - 1rem);
    padding: 0.5rem;
  }
`;

const MainWrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70vw;
  @media ${props => props.theme.mobile} {
    width: 100vw;
  }
`;

const PostWritePage = () => {
  return (
    <MainWrapper>
      <ContentWrapper>
        <PostUpdateContainer />
      </ContentWrapper>
    </MainWrapper>
  );
};

export default PostWritePage;
