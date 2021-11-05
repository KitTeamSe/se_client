import React from 'react';
import styled from 'styled-components';

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  margin: auto;
  margin-bottom: 2rem;
  padding-top: 96px;
  width: ${({ theme }) => theme.size.tablet};
  @media ${({ theme }) => theme.sizeQuery.tablet} {
    width: ${({ theme }) => theme.size.mobile};
  }
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    width: 100%;
    padding-top: 60px;
  }
`;

const Wrapper = props => {
  const { pages } = props;
  return <MainWrapper>{pages}</MainWrapper>;
};

export default Wrapper;
