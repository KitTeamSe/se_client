import React from 'react';
import styled from 'styled-components';
import { MainWrapper } from '../components/Common/Wrapper/Wrapper';
import SignupContainer from '../containers/Signup/SignupContainer';

const SignupPageWrapper = styled(MainWrapper)`
  width: ${({ theme }) => theme.size.mobile};
  @media ${({ theme }) => theme.sizeQuery.tablet} {
    width: 600px;
  }
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    width: 100%;
  }
`;

const SignupPage = () => {
  return (
    <SignupPageWrapper>
      <SignupContainer />
    </SignupPageWrapper>
  );
};

export default SignupPage;
