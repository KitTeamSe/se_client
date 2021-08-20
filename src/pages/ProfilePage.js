import React from 'react';
import styled from 'styled-components';
import HeaderContainer from '../containers/Header/HeaderContainer';
import ProfilePageContainer from '../containers/ProfilePage/ProfilePageContainer';

const BodyContainer = styled.div`
  padding-top: 96px;
`;

const ProfilePage = () => (
  <>
    <HeaderContainer />
    <BodyContainer>
      <ProfilePageContainer />
    </BodyContainer>
  </>
);
export default ProfilePage;
