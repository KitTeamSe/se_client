import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';
import * as api from '../../libs/api/auth';
import {
  createRequestActionTypes,
  createRequestSaga
} from '../../libs/createRequestSaga';

// Actions
const INITIALIZE = 'account/INITIALIZE';
const CHANGE_FIELD = 'account/CHANGE_FIELD';
const [MYINFO, MYINFO_SUCCESS, MYINFO_FAILURE] =
  createRequestActionTypes('account/MYINFO');
const [MYINFOEDIT, MYINFOEDIT_SUCCESS, MYINFOEDIT_FAILURE] =
  createRequestActionTypes('account/MYINFOEDIT');
// Action Creators
export const initialize = createAction(INITIALIZE);
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

// Sagas
const myinfoSaga = createRequestSaga(MYINFO, api.myinfo);
const myinfoeditSaga = createRequestSaga(MYINFOEDIT, api.myinfoedit);

export function* accountSaga() {
  yield takeLatest(MYINFO, myinfoSaga);
  yield takeLatest(MYINFOEDIT, myinfoeditSaga);
}

// reducer (handleActions => switch문 대체)
const initialState = {
  myinfo: null,
  myinfoError: null,
  myinfoEditRes: null,
  myinfoEditError: null
};

export default handleActions(
  {
    [INITIALIZE]: () => initialState,
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft.myinfo[form][key] = value;
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
    })
  },
  initialState
);
