import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';
import * as api from '../../libs/api/account';
import {
  createRequestActionTypes,
  createRequestSaga
} from '../../libs/createRequestSaga';
import reducerUtils from '../../libs/reducerUtils';

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
export const myinfo = createAction(MYINFO, ({ id }) => ({
  id
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
  myinfo: reducerUtils.initial(),
  myinfoEditRes: reducerUtils.initial(),
  accountDeleteRes: reducerUtils.initial()
};

export default handleActions(
  {
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form]
    }),
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value;
      }),
    [MYINFO]: state => ({
      ...state,
      myinfo: reducerUtils.loading(state.myinfo.data)
    }),
    [MYINFO_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      myinfo: reducerUtils.success(response)
    }),
    [MYINFO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      myinfo: reducerUtils.error(error)
    }),
    [MYINFOEDIT]: state => ({
      ...state,
      myinfoEditRes: reducerUtils.loading(state.myinfoEditRes.data)
    }),
    [MYINFOEDIT_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      myinfoEditRes: reducerUtils.success(response)
    }),
    [MYINFOEDIT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      myinfoEditRes: reducerUtils.error(error)
    }),
    [ACCOUNTDELETE]: state => ({
      ...state,
      accountDeleteRes: reducerUtils.loading(state.accountDeleteRes.data)
    }),
    [ACCOUNTDELETE_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      accountDeleteRes: reducerUtils.success(response)
    }),
    [ACCOUNTDELETE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      accountDeleteRes: reducerUtils.error(error)
    })
  },
  initialState
);
