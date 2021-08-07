import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';
import * as api from '../../libs/api/auth';
import {
  createRequestActionTypes,
  createRequestSaga
} from '../../libs/createRequestSaga';

// Actions
const INITIALIZE_FORM = 'account/INITIALIZE_FORM';
const CHANGE_FIELD = 'account/CHANGE_FIELD';
const [MYINFO, MYINFO_SUCCESS, MYINFO_FAILURE] =
  createRequestActionTypes('account/MYINFO');
const [MYINFOEDIT, MYINFOEDIT_SUCCESS, MYINFOEDIT_FAILURE] =
  createRequestActionTypes('account/MYINFOEDIT');
const [ACCOUNTDELETE, ACCOUNTDELETE_SUCCESS, ACCOUNTDELETE_FAILURE] =
  createRequestActionTypes('account/ACCOUNTDELETE');

// Action Creators
export const initializeForm = createAction(INITIALIZE_FORM, form => form);
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value
  })
);
export const myinfo = createAction(MYINFO, ({ token }) => ({
  token
}));
export const myinfoedit = createAction(MYINFOEDIT, ({ parameter, token }) => ({
  parameter,
  token
}));
export const accountdelete = createAction(
  ACCOUNTDELETE,
  ({ userId, token }) => ({
    userId,
    token
  })
);

// Sagas
const myinfoSaga = createRequestSaga(MYINFO, api.myinfo);
const myinfoeditSaga = createRequestSaga(MYINFOEDIT, api.myinfoedit);
const accountdeleteSaga = createRequestSaga(ACCOUNTDELETE, api.accountdelete);

export function* accountSaga() {
  yield takeLatest(MYINFO, myinfoSaga);
  yield takeLatest(MYINFOEDIT, myinfoeditSaga);
  yield takeLatest(ACCOUNTDELETE, accountdeleteSaga);
}

// reducer (handleActions => switch문 대체)
const initialState = {
  newPwForm: {
    nowPassword: '',
    newPassword: '',
    newPasswordConfirm: ''
  },
  withDrawalForm: {
    password: '',
    text: ''
  },
  myinfo: null,
  myinfoError: null,
  myinfoEditRes: null,
  myinfoEditError: null,
  accountDeleteRes: null,
  accountDeleteError: null
};

export default handleActions(
  {
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null
    }),
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value;
      }),
    [MYINFO_SUCCESS]: (state, { payload: myInfo }) => ({
      ...state,
      myinfo: myInfo,
      myinfoError: null
    }),
    [MYINFO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      myinfo: null,
      myinfoError: error
    }),
    [MYINFOEDIT_SUCCESS]: (state, { payload: myinfoEditRes }) => ({
      ...state,
      myinfoEditRes,
      myinfoEditError: null
    }),
    [MYINFOEDIT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      myinfoEditRes: null,
      myinfoEditError: error
    }),
    [ACCOUNTDELETE_SUCCESS]: (state, { payload: accountDeleteRes }) => ({
      ...state,
      accountDeleteRes,
      myinfoEditError: null
    }),
    [ACCOUNTDELETE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      accountDeleteRes: null,
      accountDeleteError: error
    })
  },
  initialState
);
