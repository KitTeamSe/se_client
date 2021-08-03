import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfilePage from '../../components/ProfilePage/ProfilePage';
import { myinfo } from '../../modules/account';
import { myinfoedit } from '../../libs/api/auth';

const ProfilePageContainer = () => {
  const [info, setInfo] = useState({ Waitting: 'Waitting' });
  const [editMode, setEditMode] = useState(false);
  const [infoEdit, setInfoEdit] = useState();

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
      console.log(data);
    }
  }, [myinfoError, myInformation, dispatch]);

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
    // const { informationOpenAgree, name, nickname, studentId, type, password } =
    //   infoEdit;
    const { nickname } = infoEdit;
    const parameter = {
      // answer: '대충아무거나',
      id: userId,
      // informationOpenAgree,
      // name,
      nickname
      // password,
      // questionId: 1,
      // studentId: studentId + 1,
      // type
    };
    console.log(parameter);
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
    />
  );
};
export default ProfilePageContainer;
