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

// Sagas
const myinfoSaga = createRequestSaga(MYINFO, api.myinfo);

export function* accountSaga() {
  yield takeLatest(MYINFO, myinfoSaga);
}

// reducer (handleActions => switch문 대체)
const initialState = {
  myinfo: null,
  myinfoError: null
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
    })
  },
  initialState
);
