import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';
import * as api from '../../libs/api/auth';
import {
  createRequestSaga,
  createRequestActionTypes
} from '../../libs/createRequestSaga';

// Actions
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const INITIALIZE_AUTH = 'auth/INITIALIZE_AUTH';

const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] =
  createRequestActionTypes('auth/SIGNUP');

const [SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE] =
  createRequestActionTypes('auth/SIGNIN');

const [MYINFO, MYINFO_SUCCESS, MYINFO_FAILURE] =
  createRequestActionTypes('auth/MYINFO');

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({ form, key, value })
);

// Action Creators
export const initializeForm = createAction(INITIALIZE_FORM, form => form);
export const initializeAuth = createAction(INITIALIZE_AUTH);

export const signup = createAction(
  SIGNUP,
  ({
    answer,
    email,
    id,
    name,
    nickname,
    password,
    phoneNumber,
    questionId,
    studentId,
    type
  }) => ({
    answer,
    email,
    id,
    name,
    nickname,
    password,
    phoneNumber,
    questionId,
    studentId,
    type
  })
);

export const signin = createAction(SIGNIN, ({ id, pw }) => ({ id, pw }));

export const myinfo = createAction(MYINFO, ({ token }) => ({
  token
}));
// Sagas
const signupSaga = createRequestSaga(SIGNUP, api.signup);
const signinSaga = createRequestSaga(SIGNIN, api.signin);
const myinfoSaga = createRequestSaga(MYINFO, api.myinfo);

export function* authSaga() {
  yield takeLatest(SIGNUP, signupSaga);
  yield takeLatest(SIGNIN, signinSaga);
  yield takeLatest(MYINFO, myinfoSaga);
}

// reducer (handleActions => switch문 대체)
const initialState = {
  signup: {
    answer: '',
    email: '',
    id: '',
    name: '',
    nickname: '',
    password: '',
    passwordCheck: '',
    phoneNumber: '',
    questionId: 1,
    studentId: '',
    type: 'STUDENT'
  },
  signin: {
    id: '',
    pw: ''
  },
  auth: null,
  authError: null,
  signupResponse: null,
  signupError: null,
  myInfo: null,
  myinfoError: null
};

export default handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null
    }),
    [INITIALIZE_AUTH]: state => ({
      ...state,
      auth: null,
      authError: null,
      signupResponse: null,
      signupError: null,
      myInfo: null,
      myinfoError: null
    }),
    [SIGNUP_SUCCESS]: (state, { payload: signupResponse }) => ({
      ...state,
      signupError: null,
      signupResponse
    }),
    [SIGNUP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      signupError: error
    }),
    [SIGNIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth
    }),
    [SIGNIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error
    }),
    [MYINFO_SUCCESS]: (state, { payload: myInfo }) => ({
      ...state,
      myinfoError: null,
      myInfo
    }),
    [MYINFO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      myinfoError: error
    })
  },
  initialState
);
