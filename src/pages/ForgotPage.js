import React from 'react';
import styled from 'styled-components';
import { GridWrapper } from '../components/Common/Wrapper/Wrapper';
import ForgotContainer from '../containers/Forgot/ForgotContainer';

const MainWrapper = styled(GridWrapper)`
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  transition: all 0.3s;
  @media ${({ theme }) => theme.sizeQuery.tablet} {
    grid-template-columns: 1fr;
    justify-items: center;
    width: 600px;
  }
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    width: 100%;
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
