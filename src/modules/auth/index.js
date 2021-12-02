import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as api from '../../libs/api/auth';
import {
  createRequestSaga,
  createRequestActionTypes
} from '../../libs/createRequestSaga';
import reducerUtils from '../../libs/reducerUtils';

// Actions
const INITIALIZE = 'account/INITIALIZE';
const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] =
  createRequestActionTypes('signin/SIGNUP');
const [SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE] =
  createRequestActionTypes('signin/SIGNIN');
const [CHECK_PASSWORD, CHECK_PASSWORD_SUCCESS, CHECK_PASSWORD_FAILURE] =
  createRequestActionTypes('signin/CHECK_PASSWORD');

// Action Creators
export const initialize = createAction(INITIALIZE);
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
  signup: reducerUtils.initial(),
  signin: reducerUtils.initial(),
  checkPassword: reducerUtils.initial()
};

export default handleActions(
  {
    [INITIALIZE]: () => initialState,

    [SIGNUP]: state => ({
      ...state,
      signup: reducerUtils.loading(state.signup.data)
    }),
    [SIGNUP_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      signup: reducerUtils.success(response)
    }),
    [SIGNUP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      signup: reducerUtils.error(error)
    }),

    [SIGNIN]: state => ({
      ...state,
      signin: reducerUtils.loading(state.signin.data)
    }),
    [SIGNIN_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      signin: reducerUtils.success(response)
    }),
    [SIGNIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      signin: reducerUtils.error(error)
    }),

    [CHECK_PASSWORD]: state => ({
      ...state,
      checkPassword: reducerUtils.loading(state.checkPassword.data)
    }),
    [CHECK_PASSWORD_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      checkPassword: reducerUtils.success(response)
    }),
    [CHECK_PASSWORD_FAILURE]: (state, { payload: error }) => ({
      ...state,
      checkPassword: reducerUtils.error(error)
    })
  },
  initialState
);
