import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ProfilePage from '../../components/ProfilePage/ProfilePage';
import * as api from '../../libs/api/auth';

const ProfilePageContainer = () => {
  const [info, setInfo] = useState({ waiting: 'waiting' });
  const history = useHistory();
  const token = localStorage.getItem('token');
  if (token == null) {
    history.push('/');
  }
  useEffect(async () => {
    const myinfo = await api.myinfo({ token });
    setInfo(myinfo.data.data);
  }, []);

  return <ProfilePage info={info} />;
};
export default ProfilePageContainer;
