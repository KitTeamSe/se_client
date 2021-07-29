import React, { useState, useEffect } from 'react';
import ProfilePage from '../../components/ProfilePage/ProfilePage';
import * as api from '../../libs/api/auth';

const ProfilePageContainer = () => {
  const [info, setInfo] = useState({ waiting: 'waiting' });
  useEffect(async () => {
    const token = localStorage.getItem('token');
    const myinfo = await api.myinfo({ token });
    setInfo(myinfo.data.data);
  }, []);

  return <ProfilePage info={info} />;
};
export default ProfilePageContainer;
