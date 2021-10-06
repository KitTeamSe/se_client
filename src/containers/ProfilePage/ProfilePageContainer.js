import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfilePage from '../../components/ProfilePage/ProfilePage';
import {
  initializeForm,
  changeField,
  myInfo,
  myInfoEdit,
  accountDelete
} from '../../modules/account';
import { checkPassword, initializeAuth } from '../../modules/auth';
import WithdrawalDialog from '../../components/ProfilePage/WithdrawalDialog';
import PwChangeDialog from '../../components/ProfilePage/PwChangeDialog';

const ProfilePageContainer = props => {
  const { match, history } = props;

  const [infoObj, setInfoObj] = useState(null);
  const [infoEditObj, setInfoEditObj] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [mode, setMode] = useState(null);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  if (token === null) {
    history.push('/');
  }

  const {
    data,
    loading,
    myInfoError,
    myInfoEditRes,
    myInfoEditError,
    newPwForm,
    withDrawalForm,
    accountDeleteRes,
    checkPwData,
    checkPwError
  } = useSelector(({ account, auth }) => ({
    data: account.myInfo.data,
    loading: account.myInfo.loading,
    myInfoError: account.myInfo.error,
    myInfoEditRes: account.myInfoEditRes.data,
    myInfoEditError: account.myInfoEditRes.error,
    newPwForm: account.newPwForm,
    withDrawalForm: account.withDrawalForm,
    accountDeleteRes: account.accountDeleteRes,
    checkPwData: auth.loadCheckPassword.data,
    checkPwError: auth.loadCheckPassword.error
  }));

  useEffect(() => {
    const id = match.params.userId;
    dispatch(myInfo({ id }));
  }, [match.params]);

  useEffect(() => {
    if (accountDeleteRes.data) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      dispatch(initializeAuth());
      history.push('/');
    }
  }, [accountDeleteRes]);

  const editFormRefresh = () => {
    if (data) {
      const res = data.data;
      setInfoObj(res);
      setInfoEditObj(res);
    }
  };

  useEffect(() => {
    editFormRefresh();
  }, [data]);

  useEffect(() => {
    if (myInfoError) {
      setError(String(myInfoError.message));
    }
    if (myInfoEditError) {
      setError(String(myInfoEditError.message));
    }
  }, [myInfoError, myInfoEditError]);

  useEffect(() => {
    if (myInfoEditRes) {
      const id = match.params.userId;
      dispatch(myInfo({ id }));
      setMode(null);
    }
  }, [myInfoEditRes]);

  const handleChange = e => {
    e.preventDefault();
    const { value, id } = e.target;
    if (id === 'nickname') {
      if (value.length >= 20 && value.length <= 2) {
        // 알림 띄우기
        console.log('err');
      }
    }
    setInfoEditObj({ ...infoEditObj, [id]: value });
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

  const menuClick = e => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(e.currentTarget);
    }
  };

  const pwChangeSubmit = e => {
    e.preventDefault();
    const { nowPassword } = newPwForm;
    dispatch(checkPassword({ pw: nowPassword }));
  };

  const withdrawalSubmit = e => {
    e.preventDefault();
    const { password } = withDrawalForm;
    dispatch(checkPassword({ pw: password }));
  };

  const myInfoEditSubmit = e => {
    e.preventDefault();
    const { password } = infoEditObj;
    dispatch(checkPassword({ pw: password }));
  };

  const handlePwChange = () => {
    const { newPassword, newPasswordConfirm } = newPwForm;

    if (newPassword !== newPasswordConfirm) {
      setError('새비밀번호 확인이 맞지 않습니다');
    } else {
      const parameter = { id: userId, password: newPassword };
      dispatch(myInfoEdit({ parameter }));
    }
  };

  const handleWithdrawal = () => {
    const { text } = withDrawalForm;

    if (text === '탈퇴') {
      dispatch(accountDelete({ userId }));
    } else {
      setError('탈퇴를 입력하세요');
    }
  };

  const handleMyInfoEdit = () => {
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
    dispatch(myInfoEdit({ parameter }));
  };

  useEffect(() => {
    if (checkPwData) {
      if (mode === 'editMode') handleMyInfoEdit();
      if (mode === 'pwChangeMode') handlePwChange();
      if (mode === 'withdrawalMode') handleWithdrawal();
    }
    if (checkPwError) {
      setError('현재 비밀번호 확인이 맞지 않습니다');
    }
  }, [checkPwData, checkPwError]);

  return (
    <>
      <WithdrawalDialog
        mode={mode}
        error={error}
        withDrawalForm={withDrawalForm}
        modeChange={modeChange}
        formChange={formChange}
        withdrawalSubmit={withdrawalSubmit}
      />
      <PwChangeDialog
        mode={mode}
        error={error}
        newPwForm={newPwForm}
        modeChange={modeChange}
        pwChangeSubmit={pwChangeSubmit}
        formChange={formChange}
      />
      <ProfilePage
        infoObj={infoObj}
        infoEditObj={infoEditObj}
        anchorEl={anchorEl}
        mode={mode}
        handleChange={handleChange}
        formChange={formChange}
        informationOpenAgreeChange={informationOpenAgreeChange}
        menuClick={menuClick}
        modeChange={modeChange}
        myInfoEditSubmit={myInfoEditSubmit}
        editFormRefresh={editFormRefresh}
        loading={loading}
      />
    </>
  );
};
export default withRouter(ProfilePageContainer);
