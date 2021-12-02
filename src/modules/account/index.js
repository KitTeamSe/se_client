import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as api from '../../libs/api/account';
import {
  createRequestActionTypes,
  createRequestSaga
} from '../../libs/createRequestSaga';
import reducerUtils from '../../libs/reducerUtils';

// Actions
const INITIALIZE = 'account/INITIALIZE';
const [LOAD_ACCOUNT, LOAD_ACCOUNT_SUCCESS, LOAD_ACCOUNT_FAILURE] =
  createRequestActionTypes('account/LOAD_ACCOUNT');
const [UPDATE_ACCOUNT, UPDATE_ACCOUNT_SUCCESS, UPDATE_ACCOUNT_FAILURE] =
  createRequestActionTypes('account/UPDATE_ACCOUNT');
const [REMOVE_ACCOUNT, REMOVE_ACCOUNT_SUCCESS, REMOVE_ACCOUNT_FAILURE] =
  createRequestActionTypes('account/REMOVE_ACCOUNT');
const [FIND_USER_ID, FIND_USER_ID_SUCCESS, FIND_USER_ID_FAILURE] =
  createRequestActionTypes('find/FIND_USER_ID');
const [GET_QUESTION_ID, GET_QUESTION_ID_SUCCESS, GET_QUESTION_ID_FAILURE] =
  createRequestActionTypes('find/GET_QUESTION_ID');
const [FIND_PASSWORD, FIND_PASSWORD_SUCCESS, FIND_PASSWORD_FAILURE] =
  createRequestActionTypes('find/FIND_PASSWORD');

// Action Creators
export const initialize = createAction(INITIALIZE);
export const loadAccount = createAction(LOAD_ACCOUNT, ({ id }) => ({
  id
}));
export const updateAccount = createAction(
  UPDATE_ACCOUNT,
  ({ parameter, token }) => ({
    parameter,
    token
  })
);
export const removeAccount = createAction(
  REMOVE_ACCOUNT,
  ({ userId, token }) => ({
    userId,
    token
  })
);
export const findUserIdByEmail = createAction(FIND_USER_ID, ({ email }) => ({
  email
}));
export const getQuestionIdByUserId = createAction(
  GET_QUESTION_ID,
  ({ userId }) => ({
    userId
  })
);
export const findPassword = createAction(
  FIND_PASSWORD,
  ({ answer, email, id, questionId }) => ({
    answer,
    email,
    id,
    questionId
  })
);

// Sagas
const loadAccountSaga = createRequestSaga(LOAD_ACCOUNT, api.getAccount);
const updateAccountSaga = createRequestSaga(UPDATE_ACCOUNT, api.updateAccount);
const removeAccountSaga = createRequestSaga(REMOVE_ACCOUNT, api.removeAccount);
const findIdSaga = createRequestSaga(FIND_USER_ID, api.findUserIdByEmail);
const getQuestionSaga = createRequestSaga(
  GET_QUESTION_ID,
  api.getQuestionIdByUserId
);
const findPasswordSaga = createRequestSaga(FIND_PASSWORD, api.findPassword);

export function* accountSaga() {
  yield takeLatest(LOAD_ACCOUNT, loadAccountSaga);
  yield takeLatest(UPDATE_ACCOUNT, updateAccountSaga);
  yield takeLatest(REMOVE_ACCOUNT, removeAccountSaga);
  yield takeLatest(FIND_USER_ID, findIdSaga);
  yield takeLatest(GET_QUESTION_ID, getQuestionSaga);
  yield takeLatest(FIND_PASSWORD, findPasswordSaga);
}

// reducer
const initialState = {
  loadAccount: reducerUtils.initial(),
  updateAccount: reducerUtils.initial(),
  removeAccount: reducerUtils.initial(),
  findId: reducerUtils.initial(),
  getQuestion: reducerUtils.initial(),
  findPassword: reducerUtils.initial()
};

export default handleActions(
  {
    [INITIALIZE]: () => initialState,

    [LOAD_ACCOUNT]: state => ({
      ...state,
      loadAccount: reducerUtils.loading(state.loadAccount.data)
    }),
    [LOAD_ACCOUNT_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      loadAccount: reducerUtils.success(response)
    }),
    [LOAD_ACCOUNT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadAccount: reducerUtils.error(error)
    }),

    [UPDATE_ACCOUNT]: state => ({
      ...state,
      updateAccount: reducerUtils.loading(state.updateAccount.data)
    }),
    [UPDATE_ACCOUNT_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      updateAccount: reducerUtils.success(response)
    }),
    [UPDATE_ACCOUNT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      updateAccount: reducerUtils.error(error)
    }),

    [REMOVE_ACCOUNT]: state => ({
      ...state,
      removeAccount: reducerUtils.loading(state.removeAccount.data)
    }),
    [REMOVE_ACCOUNT_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      removeAccount: reducerUtils.success(response)
    }),
    [REMOVE_ACCOUNT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      removeAccount: reducerUtils.error(error)
    }),

    [FIND_USER_ID]: state => ({
      ...state,
      findId: reducerUtils.loading(state.findId.data)
    }),
    [FIND_USER_ID_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      findId: reducerUtils.success(response)
    }),
    [FIND_USER_ID_FAILURE]: (state, { payload: error }) => ({
      ...state,
      findId: reducerUtils.error(error)
    }),

    [GET_QUESTION_ID]: state => ({
      ...state,
      getQuestion: reducerUtils.loading(state.getQuestion.data)
    }),
    [GET_QUESTION_ID_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      getQuestion: reducerUtils.success(response)
    }),
    [GET_QUESTION_ID_FAILURE]: (state, { payload: error }) => ({
      ...state,
      getQuestion: reducerUtils.error(error)
    }),

    [FIND_PASSWORD]: state => ({
      ...state,
      findPassword: reducerUtils.loading(state.findPassword.data)
    }),
    [FIND_PASSWORD_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      findPassword: reducerUtils.success(response)
    }),
    [FIND_PASSWORD_FAILURE]: (state, { payload: error }) => ({
      ...state,
      findPassword: reducerUtils.error(error)
    })
  },
  initialState
);
