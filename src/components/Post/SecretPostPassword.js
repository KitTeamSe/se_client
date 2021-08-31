import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const MainWrapper = styled.div`
  margin-top: 3rem;
  width: calc(100% - 4rem);
  padding: 2rem;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const SecretPostPassword = props => {
  const { passwrod, PasswordSubmit } = props;
  const { location, match } = props;
  console.log('location', location);
  console.log('match', match);

  return (
    <MainWrapper PasswordSubmit={PasswordSubmit} passwrod={passwrod}>
      <div>asdf</div>
    </MainWrapper>
  );
};

export default withRouter(SecretPostPassword);
