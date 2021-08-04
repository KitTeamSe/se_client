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
  const [anchorEl, setAnchorEl] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

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
    if (myinfoEditRes) {
      setEditRes(String(myinfoEditRes.message));
      window.location.reload();
    }
    if (myinfoEditError) {
      setEditRes(String(myinfoEditError));
    }
  }, [myinfoError, myInformation, myinfoEditRes, myinfoEditError, dispatch]);

  const editModeChange = e => {
    e.preventDefault();
    setAnchorEl(null);
    setEditMode(!editMode);
    setInfoEdit(myInformation.data);
  };

  const handleChange = e => {
    e.preventDefault();
    const { value, id } = e.target;
    setInfoEdit({ ...infoEdit, [id]: value });
  };

  const informationOpenAgreeChange = e => {
    e.preventDefault();
    if (infoEdit.informationOpenAgree === 'AGREE') {
      setInfoEdit({
        ...infoEdit,
        informationOpenAgree: 'DISAGREE'
      });
    } else {
      setInfoEdit({
        ...infoEdit,
        informationOpenAgree: 'AGREE'
      });
    }
  };

  const menuOpenClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const menuCloseClick = () => {
    setAnchorEl(null);
  };

  const onMyinfoEditSubmit = e => {
    e.preventDefault();

    const parameter = {};
    const infoEditKeys = Object.keys(infoEdit);
    for (let i = 0; i < infoEditKeys.length; i += 1) {
      const key = infoEditKeys[i];
      if (info[key] !== infoEdit[key]) {
        parameter[key] = infoEdit[key];
      }
    }

    if (parameter && Object.keys(parameter).length === 0) {
      console.log('변한게 없습니다');
      return;
    }

    parameter.id = userId;
    dispatch(myinfoedit({ parameter, token }));
  };

  return (
    <ProfilePage
      info={info}
      editMode={editMode}
      infoEdit={infoEdit}
      editRes={editRes}
      anchorEl={anchorEl}
      handleChange={handleChange}
      onMyinfoEditSubmit={onMyinfoEditSubmit}
      editModeChange={editModeChange}
      informationOpenAgreeChange={informationOpenAgreeChange}
      menuOpenClick={menuOpenClick}
      menuCloseClick={menuCloseClick}
    />
  );
};
export default ProfilePageContainer;
