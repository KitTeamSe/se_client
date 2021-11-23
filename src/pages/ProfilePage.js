import React from 'react';
import styled from 'styled-components';
import ProfilePageContainer from '../containers/ProfilePage/ProfilePageContainer';
import { MainWrapper } from '../components/Common/Wrapper/Wrapper';

const ProfilePageWrapper = styled(MainWrapper)`
  width: ${({ theme }) => theme.size.mobile};
  @media ${({ theme }) => theme.sizeQuery.tablet} {
    width: 600px;
  }
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    width: 100%;
  }
`;

const ProfilePage = () => {
  return (
    <ProfilePageWrapper>
      <ProfilePageContainer />
    </ProfilePageWrapper>
  );
};

export default ProfilePage;
