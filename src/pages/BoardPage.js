import React from 'react';
import styled from 'styled-components';
import BoardContainer from '../containers/Board/BoardContainer';

const MainWrapper = styled.div`
  margin: auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 70vw;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1.5rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  @media ${props => props.theme.mobile} {
    width: calc(100vw - 1rem);
    margin-top: 1rem;
    padding: 0.5rem;
  }
`;

const BoardPage = () => {
  return (
    <MainWrapper>
      <BoardContainer />
    </MainWrapper>
  );
};

export default BoardPage;
