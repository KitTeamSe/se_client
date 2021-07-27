import React from 'react';
import ProfilePage from '../../components/ProfilePage/ProfilePage';

const ProfilePageContainer = () => {
  const dummyData = {
    사진: '사진을 추가하여 계정을 맞춤설정할 수 있습니다',
    이름: '길무짱',
    생년월일: '생일추가',
    성별: '남성',
    비밀번호: 'se75407540'
  };

  return <ProfilePage dummyData={dummyData} />;
};
export default ProfilePageContainer;
