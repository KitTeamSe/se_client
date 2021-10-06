import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';
import * as api from '../../libs/api/auth';
import {
  createRequestSaga,
  createRequestActionTypes
} from '../../libs/createRequestSaga';
import reducerUtils from '../../libs/reducerUtils';

// Actions
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const INITIALIZE_AUTH = 'auth/INITIALIZE_AUTH';
const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] =
  createRequestActionTypes('auth/SIGNUP');
const [SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE] =
  createRequestActionTypes('auth/SIGNIN');
const [CHECK_PASSWORD, CHECK_PASSWORD_SUCCESS, CHECK_PASSWORD_FAILURE] =
  createRequestActionTypes('auth/CHECK_PASSWORD');

// Action Creators
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({ form, key, value })
);
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
export const checkPassword = createAction(CHECK_PASSWORD, ({ pw }) => ({ pw }));

// Sagas
const signupSaga = createRequestSaga(SIGNUP, api.signup);
const signinSaga = createRequestSaga(SIGNIN, api.signin);
const checkPasswordSaga = createRequestSaga(CHECK_PASSWORD, api.checkPassword);

export function* authSaga() {
  yield takeLatest(SIGNUP, signupSaga);
  yield takeLatest(SIGNIN, signinSaga);
  yield takeLatest(CHECK_PASSWORD, checkPasswordSaga);
}

// reducer
const initialState = {
  signup: {
    answer: '',
    email: '',
    id: '',
    name: '',
    nickname: '',
    password: '',
    checkPassword: '',
    phoneNumber: '',
    questionId: 1,
    studentId: '',
    type: 'STUDENT'
  },
  signin: {
    id: '',
    pw: ''
  },
  auth: reducerUtils.initial(),
  signupResponse: reducerUtils.initial(),
  loadCheckPassword: reducerUtils.initial()
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
      auth: reducerUtils.initial()
    }),
    [INITIALIZE_AUTH]: state => ({
      ...state,
      auth: reducerUtils.initial(),
      signupResponse: reducerUtils.initial()
    }),
    [SIGNUP]: state => ({
      ...state,
      signupResponse: reducerUtils.loading(state.signupResponse.data)
    }),
    [SIGNUP_SUCCESS]: (state, { payload: signupResponse }) => ({
      ...state,
      signupResponse: reducerUtils.success(signupResponse)
    }),
    [SIGNUP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      signupResponse: reducerUtils.error(error)
    }),
    [SIGNIN]: state => ({
      ...state,
      auth: reducerUtils.loading(state.auth.data)
    }),
    [SIGNIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth: reducerUtils.success(auth)
    }),
    [SIGNIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      auth: reducerUtils.error(error)
    }),
    [CHECK_PASSWORD]: state => ({
      ...state,
      loadCheckPassword: reducerUtils.loading(state.loadCheckPassword.data)
    }),
    [CHECK_PASSWORD_SUCCESS]: (state, { payload: loadCheckPassword }) => ({
      ...state,
      loadCheckPassword: reducerUtils.success(loadCheckPassword)
    }),
    [CHECK_PASSWORD_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadCheckPassword: reducerUtils.error(error)
    })
  },
  initialState
);
