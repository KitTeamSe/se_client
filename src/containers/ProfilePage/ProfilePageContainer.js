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
  const [infoEditObj, setInfoEditObj] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [mode, setMode] = useState(null);
  const [error, setError] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  if (token === null) {
    history.push('/');
  }

  const {
    myinformation,
    myinformationLoading,
    myinfoError,
    myinfoEditRes,
    myinfoEditLoading,
    myinfoEditError,
    newPwForm,
    withDrawalForm
  } = useSelector(({ account }) => ({
    myinformation: account.myinfo.data,
    myinformationLoading: account.myinfo.loading,
    myinfoError: account.myinfo.error,
    myinfoEditRes: account.myinfoEditRes.data,
    myinfoEditLoading: account.myinfoEditRes.loading,
    myinfoEditError: account.myinfoEditRes.error,
    newPwForm: account.newPwForm,
    withDrawalForm: account.withDrawalForm
  }));

  useEffect(() => {
    dispatch(myinfo({ token }));
  }, []);

  function editFormRefresh() {
    if (myinformation) {
      const { data } = myinformation;
      setInfoObj(data);
      setInfoEditObj(data);
    }
  }

  useEffect(() => {
    editFormRefresh();
  }, [myinformation]);

  useEffect(() => {
    if (myinfoError) {
      setInfoObj({ Error: String(myinfoError) });
      setError(String(myinfoError));
    }
    if (myinfoEditError) {
      setError(String(myinfoEditError));
    }
    if (myinfoEditRes) {
      dispatch(myinfo({ token }));
      setMode(null);
    }
  }, [myinfoError, myinfoEditError, myinfoEditRes]);

  const handleChange = e => {
    e.preventDefault();
    const { value, id } = e.target;
    setInfoEditObj({ ...infoEditObj, [id]: value });
  };

  const typeChange = e => {
    e.preventDefault();
    const { value } = e.target;
    setInfoEditObj({ ...infoEditObj, type: value });
  };

  const informationOpenAgreeChange = e => {
    e.preventDefault();
    if (infoEditObj.informationOpenAgree === 'AGREE') {
      setInfoEditObj({
        ...infoEditObj,
        informationOpenAgree: 'DISAGREE'
      });
    } else {
      setInfoEditObj({
        ...infoEditObj,
        informationOpenAgree: 'AGREE'
      });
    }
  };

  const formChange = e => {
    e.preventDefault();
    const { value, id } = e.target;
    if (['nowPassword', 'newPassword', 'newPasswordConfirm'].includes(id)) {
      dispatch(
        changeField({
          form: 'newPwForm',
          key: id,
          value
        })
      );
    }
    if (['password', 'text'].includes(id)) {
      dispatch(
        changeField({
          form: 'withDrawalForm',
          key: id,
          value
        })
      );
    }
  };

  const modeChange = e => {
    e.preventDefault();
    const value = e.target.id;
    setAnchorEl(null);
    setError(null);
    if (mode === value) {
      setMode(null);
    } else {
      setMode(value);
    }
    dispatch(initializeForm('newPwForm'));
    editFormRefresh();
  };

  const pwChangeSubmit = e => {
    e.preventDefault();
    const { newPassword, newPasswordConfirm } = newPwForm;
    const parameter = {};
    // 비밀번호 확인하는 로직 필요

    if (newPassword !== newPasswordConfirm) {
      setError('새비밀번호 확인이 맞지 않습니다');
      return;
    }
    parameter.password = newPassword;
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

  const menuClick = e => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(e.currentTarget);
    }
  };

  const myinfoEditSubmit = e => {
    e.preventDefault();
    const parameter = {};
    const infoEditObjKeys = Object.keys(infoEditObj);
    for (let i = 0; i < infoEditObjKeys.length; i += 1) {
      const key = infoEditObjKeys[i];
      if (infoObj[key] !== infoEditObj[key]) {
        parameter[key] = infoEditObj[key];
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
      infoEditObj={infoEditObj}
      anchorEl={anchorEl}
      mode={mode}
      newPwForm={newPwForm}
      withDrawalForm={withDrawalForm}
      error={error}
      handleChange={handleChange}
      formChange={formChange}
      typeChange={typeChange}
      informationOpenAgreeChange={informationOpenAgreeChange}
      menuClick={menuClick}
      modeChange={modeChange}
      myinfoEditSubmit={myinfoEditSubmit}
      pwChangeSubmit={pwChangeSubmit}
      withdrawalSubmit={withdrawalSubmit}
      editFormRefresh={editFormRefresh}
      myinformationLoading={myinformationLoading}
      myinfoEditLoading={myinfoEditLoading}
    />
  );
};
export default ProfilePageContainer;
