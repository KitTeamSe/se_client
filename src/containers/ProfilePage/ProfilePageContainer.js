import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfilePage from '../../components/ProfilePage/ProfilePage';
import { myinfo, initializeAuth } from '../../modules/auth';

const ProfilePageContainer = () => {
  const [info, setInfo] = useState({ Waitting: 'Waitting' });
  const history = useHistory();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  if (token === null) {
    history.push('/');
  }

  const { myInformation, myinfoError } = useSelector(({ auth }) => ({
    myInformation: auth.myInfo,
    myinfoError: auth.myinfoError
  }));

  useEffect(() => {
    dispatch(myinfo({ token }));
  }, []);

  useEffect(() => {
    if (myinfoError) {
      setInfo({ Error: String(myinfoError) });
    }
    if (myInformation && myInformation.state !== 'Waitting') {
      setInfo(myInformation.data);
      dispatch(initializeAuth());
    }
  }, [myinfoError, myInformation, dispatch]);

  return <ProfilePage info={info} />;
};
export default ProfilePageContainer;
