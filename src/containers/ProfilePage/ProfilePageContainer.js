import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfilePage from '../../components/ProfilePage/ProfilePage';
import {
  myinfo,
  myinfoedit,
  initializeForm,
  changeField,
  accountdelete
} from '../../modules/account';

const ProfilePageContainer = () => {
  const [infoObj, setInfoObj] = useState({ Waitting: 'Waitting' });
  const [editMode, setEditMode] = useState(false);
  const [infoEdit, setInfoEdit] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [pwChangeDialogOpen, setPwChangeDialogOpen] = useState(false);
  const [withdrawalOpen, setWithdrawalOpen] = useState(false);
  const [error, setError] = useState(null);

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
    newPwForm,
    withDrawalForm
  } = useSelector(({ account }) => ({
    myInformation: account.myinfo,
    myinfoError: account.myinfoError,
    myinfoEditRes: account.myinfoEditRes,
    myinfoEditError: account.myinfoEditError,
    newPwForm: account.newPwForm,
    withDrawalForm: account.withDrawalForm
  }));

  useEffect(() => {
    dispatch(myinfo({ token }));
  }, []);

  function editFormRefresh() {
    if (myInformation) {
      const { data } = myInformation;
      setInfoObj(data);
      setInfoEdit(data);
    }
  }

  useEffect(() => {
    editFormRefresh();
  }, [myInformation]);

  useEffect(() => {
    if (myinfoError) {
      setInfoObj({ Error: String(myinfoError) });
      setError(String(myinfoError));
    }
    if (myinfoEditRes) {
      window.location.reload();
    }
    if (myinfoEditError) {
      setError(String(myinfoEditError));
    }
  }, [myinfoError, myinfoEditRes, myinfoEditError, dispatch]);

  const handleChange = e => {
    e.preventDefault();
    const { value, id } = e.target;
    setInfoEdit({ ...infoEdit, [id]: value });
  };

  const typeChange = e => {
    e.preventDefault();
    const { value } = e.target;
    setInfoEdit({ ...infoEdit, type: value });
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

  const withDrawalFormChange = e => {
    e.preventDefault();
    const { value, id } = e.target;
    dispatch(
      changeField({
        form: 'withDrawalForm',
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
    setError(null);
  };

  const pwChangeClick = e => {
    e.preventDefault();
    setAnchorEl(null);
    setPwChangeDialogOpen(!pwChangeDialogOpen);
    setError(null);
    dispatch(initializeForm('newPwForm'));
  };

  const withdrawalClick = e => {
    e.preventDefault();
    setAnchorEl(null);
    setWithdrawalOpen(!withdrawalOpen);
    setError(null);
  };

  const pwChangeSubmit = e => {
    e.preventDefault();
    const parameter = {};
    if (newPwForm.newPassword !== newPwForm.newPasswordConfirm) {
      setError('새비밀번호 확인이 맞지 않습니다');
      return;
    }
    parameter.password = newPwForm.newPassword;
    parameter.id = userId;
    dispatch(myinfoedit({ parameter, token }));
  };

  const withdrawalSubmit = e => {
    e.preventDefault();
    const { password, text } = withDrawalForm;
    // 비밀번호 확인하는 로직 필요
    console.log(password);
    if (text === '탈퇴') {
      dispatch(accountdelete({ userId, token }));
      setError('탈퇴가 완료되었습니다.');
    } else {
      setError('탈퇴를 입력하세요');
    }
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
      if (infoObj[key] !== infoEdit[key]) {
        parameter[key] = infoEdit[key];
      }
    }

    if (parameter && Object.keys(parameter).length === 0) {
      setError('수정사항이 없습니다');
      return;
    }

    parameter.id = userId;
    dispatch(myinfoedit({ parameter, token }));
  };

  return (
    <ProfilePage
      infoObj={infoObj}
      editMode={editMode}
      infoEdit={infoEdit}
      anchorEl={anchorEl}
      pwChangeDialogOpen={pwChangeDialogOpen}
      newPwForm={newPwForm}
      error={error}
      withdrawalOpen={withdrawalOpen}
      withDrawalForm={withDrawalForm}
      handleChange={handleChange}
      onMyinfoEditSubmit={onMyinfoEditSubmit}
      editModeChangeClick={editModeChangeClick}
      informationOpenAgreeChange={informationOpenAgreeChange}
      menuClick={menuClick}
      pwChangeClick={pwChangeClick}
      pwFormChange={pwFormChange}
      pwChangeSubmit={pwChangeSubmit}
      typeChange={typeChange}
      withdrawalClick={withdrawalClick}
      withDrawalFormChange={withDrawalFormChange}
      withdrawalSubmit={withdrawalSubmit}
      editFormRefresh={editFormRefresh}
    />
  );
};
export default ProfilePageContainer;
