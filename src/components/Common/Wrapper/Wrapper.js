import React from 'react';
import styled from 'styled-components';

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  margin: auto;
  margin-bottom: 2rem;
  background: white;
  box-shadow: 0 0 5px #ccc;
  width: ${({ theme }) => theme.size.tablet};
  @media ${({ theme }) => theme.sizeQuery.tablet} {
    width: ${({ theme }) => theme.size.mobile};
  }
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    width: 100%;
  }
`;

export const ContentWrapper = styled.div`
  width: calc(100% - 2rem);
  padding: 1rem;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = props => {
  const { pages } = props;
  return <MainWrapper>{pages}</MainWrapper>;
};

export default Wrapper;
