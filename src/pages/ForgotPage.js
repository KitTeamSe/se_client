import React from 'react';
import styled from 'styled-components';
import { GridWrapper } from '../components/Common/Wrapper/Wrapper';
import ForgotContainer from '../containers/Forgot/ForgotContainer';

const MainWrapper = styled(GridWrapper)`
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  @media ${({ theme }) => theme.sizeQuery.tablet} {
    grid-template-columns: 1fr;
    justify-items: center;
  }
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    gap: 0;
    box-shadow: 0 0 5px #ccc;
  }
`;

const ForgotPage = () => {
  return (
    <MainWrapper>
      <ForgotContainer />
    </MainWrapper>
  );
};

export default ForgotPage;
