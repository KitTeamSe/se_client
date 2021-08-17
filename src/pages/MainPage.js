import React from 'react';
import styled from 'styled-components';
import HeaderContainer from '../containers/Header/HeaderContainer';
import BoardContainer from '../containers/Board/BoardContainer';

const BodyContainer = styled.div`
  padding-top: 96px;
`;

const MainPage = () => (
  <>
    <HeaderContainer />
    <BodyContainer>
      <BoardContainer />
    </BodyContainer>
  </>
);

export default MainPage;
