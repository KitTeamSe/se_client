import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfilePage from '../../components/ProfilePage/ProfilePage';
import { myinfo, myinfoedit, changeField } from '../../modules/account';

const ProfilePageContainer = () => {
  const [info, setInfo] = useState({ Waitting: 'Waitting' });
  const [editMode, setEditMode] = useState(false);
  const [infoEdit, setInfoEdit] = useState({});
  const [editRes, setEditRes] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [pwChangeDialogOpen, setOpen] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  if (token === null) {
    history.push('/');
  }

  const {
    myInformation,
    myinfoError,
    myinfoEditRes,
    myinfoEditError,
    newPwForm
  } = useSelector(({ account }) => ({
    myInformation: account.myinfo,
    myinfoError: account.myinfoError,
    myinfoEditRes: account.myinfoEditRes,
    myinfoEditError: account.myinfoEditError,
    newPwForm: account.newPwForm
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

  const handleChange = e => {
    e.preventDefault();
    const { value, id } = e.target;
    setInfoEdit({ ...infoEdit, [id]: value });
  };

  const pwFormChange = e => {
    e.preventDefault();
    const { value, id } = e.target;
    dispatch(
      changeField({
        form: 'newPwForm',
        key: id,
        value
      })
    );
  };

  const editModeChangeClick = e => {
    e.preventDefault();
    setAnchorEl(null);
    setEditMode(!editMode);
    setInfoEdit(myInformation.data);
    setOpen(false);
  };

  const pwChangeClick = e => {
    e.preventDefault();
    setAnchorEl(null);
    setOpen(!pwChangeDialogOpen);
  };

  const pwChangeSubmit = e => {
    e.preventDefault();
    setOpen(!pwChangeDialogOpen);
    const parameter = {};
    parameter.password = newPwForm.newPassword;
    parameter.id = userId;
    dispatch(myinfoedit({ parameter, token }));
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

  const menuClick = e => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(e.currentTarget);
    }
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
      pwChangeDialogOpen={pwChangeDialogOpen}
      newPwForm={newPwForm}
      handleChange={handleChange}
      onMyinfoEditSubmit={onMyinfoEditSubmit}
      editModeChangeClick={editModeChangeClick}
      informationOpenAgreeChange={informationOpenAgreeChange}
      menuClick={menuClick}
      pwChangeClick={pwChangeClick}
      pwFormChange={pwFormChange}
      pwChangeSubmit={pwChangeSubmit}
    />
  );
};
export default ProfilePageContainer;
