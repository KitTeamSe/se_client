import React from 'react';
import { MainWrapper } from '../components/Common/Wrapper/Wrapper';
import BoardHeadContainer from '../containers/Board/BoardHeadContainer';
import BoardPaginationContainer from '../containers/Board/BoardPaginationContainer';
import BoardPostListContainer from '../containers/Board/BoardPostListContainer';

const BoardPage = () => {
  return (
    <MainWrapper>
      <BoardHeadContainer />
      <BoardPostListContainer />
      <BoardPaginationContainer />
    </MainWrapper>
  );
};

export default BoardPage;
