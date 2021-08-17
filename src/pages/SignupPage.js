import React from 'react';
import styled from 'styled-components';

import HeaderContainer from '../containers/Header/HeaderContainer';
import SignupPageContainer from '../containers/SignupPage/SignupPageContainer';

const BodyContainer = styled.div`
  padding-top: 96px;
`;

const SignupPage = () => (
  <>
    <HeaderContainer />
    <BodyContainer>
      <SignupPageContainer />
    </BodyContainer>
  </>
);
export default SignupPage;
