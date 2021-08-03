import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfilePage from '../../components/ProfilePage/ProfilePage';
import { myinfo, myinfoedit } from '../../modules/account';

const ProfilePageContainer = () => {
  const [info, setInfo] = useState({ Waitting: 'Waitting' });
  const [editMode, setEditMode] = useState(false);
  const [infoEdit, setInfoEdit] = useState({});
  const [editRes, setEditRes] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  if (token === null) {
    history.push('/');
  }

  const { myInformation, myinfoError, myinfoEditRes, myinfoEditError } =
    useSelector(({ account }) => ({
      myInformation: account.myinfo,
      myinfoError: account.myinfoError,
      myinfoEditRes: account.myinfoEditRes,
      myinfoEditError: account.myinfoEditError
    }));

  useEffect(() => {
    dispatch(myinfo({ token }));
  }, []);

  useEffect(() => {
    if (myinfoError) {
      setInfo({ Error: String(myinfoError) });
    }
    if (myInformation) {
      const { data } = myInformation;
      setInfo(data);
      setInfoEdit(data);
    }
  }, [myinfoError, myInformation, dispatch]);

  useEffect(() => {
    if (myinfoEditRes) {
      setEditRes(myinfoEditRes.message);
    }
    if (myinfoEditError) {
      setEditRes(myinfoEditRes);
    }
  }, [myinfoEditRes, myinfoEditError, dispatch]);

  const myinfoEditMode = e => {
    e.preventDefault();
    setEditMode(!editMode);
    setInfoEdit(myInformation.data);
  };

  const handleChange = e => {
    e.preventDefault();
    const { value, id } = e.target;
    setInfoEdit({ ...infoEdit, [id]: value });
  };

  const onMyinfoEditSubmit = e => {
    e.preventDefault();
    if (info === infoEdit) {
      console.log('변한게 없습니다');
      return;
    }
    const userId = localStorage.getItem('userId');
    const parameter = {};
    const objarray = Object.keys(infoEdit);
    for (let i = 0; i < objarray.length; i += 1) {
      const key = objarray[i];
      if (info[key] !== infoEdit[key]) {
        parameter[key] = infoEdit[key];
      }
    }
    parameter.id = userId;
    dispatch(myinfoedit({ parameter, token }));
  };

  return (
    <ProfilePage
      info={info}
      myinfoEditMode={myinfoEditMode}
      editMode={editMode}
      infoEdit={infoEdit}
      handleChange={handleChange}
      onMyinfoEditSubmit={onMyinfoEditSubmit}
      editRes={editRes}
    />
  );
};
export default ProfilePageContainer;
