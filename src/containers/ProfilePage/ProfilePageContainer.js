import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfilePage from '../../components/ProfilePage/ProfilePage';
import { myinfo } from '../../modules/account';
import { myinfoedit } from '../../libs/api/auth';

const ProfilePageContainer = () => {
  const [info, setInfo] = useState({ Waitting: 'Waitting' });
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [infoEdit, setInfoEdit] = useState();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  if (token === null) {
    history.push('/');
  }

  const { myInformation, myinfoError } = useSelector(({ account }) => ({
    myInformation: account.myinfo,
    myinfoError: account.myinfoError
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

  const myinfoEditMode = e => {
    e.preventDefault();
    setEditMode(!editMode);
    setInfoEdit(myInformation.data);
  };

  const handleChange = e => {
    const { value, id } = e.target;
    setInfoEdit({ ...infoEdit, [id]: value });
  };

  const pwChange = e => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  const onMyinfoEditSubmit = e => {
    e.preventDefault();
    if (info === infoEdit) {
      console.log('변한게 없습니다');
      return;
    }
    const userId = localStorage.getItem('userId');
    const { informationOpenAgree, name, nickname, studentId, type } = infoEdit;
    const parameter = {
      answer: '대충아무거나',
      id: userId,
      informationOpenAgree,
      name,
      nickname,
      password,
      questionId: 1,
      studentId: studentId + 1,
      type
    };
    myinfoedit({ parameter, token });
  };

  return (
    <ProfilePage
      info={info}
      myinfoEditMode={myinfoEditMode}
      editMode={editMode}
      infoEdit={infoEdit}
      handleChange={handleChange}
      onMyinfoEditSubmit={onMyinfoEditSubmit}
      handleClickOpen={handleClickOpen}
      handleClose={handleClose}
      open={open}
      error={error}
      pwChange={pwChange}
      password={password}
    />
  );
};
export default ProfilePageContainer;
