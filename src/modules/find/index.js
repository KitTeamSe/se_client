import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';
import * as api from '../../libs/api/find';
import {
  createRequestActionTypes,
  createRequestSaga
} from '../../libs/createRequestSaga';
import reducerUtils from '../../libs/reducerUtils';

// Actions
const INITIALIZE_FORM = 'find/INITIALIZE_FORM';
const CHANGE_FIELD = 'find/CHANGE_FIELD';
const [FIND_ID, FIND_ID_SUCCESS, FIND_ID_FAILURE] =
  createRequestActionTypes('find/FIND_ID');
const [FIND_QUESTION, FIND_QUESTION_SUCCESS, FIND_QUESTION_FAILURE] =
  createRequestActionTypes('find/FIND_QUESTION');
const [FIND_PASSWORD, FIND_PASSWORD_SUCCESS, FIND_PASSWORD_FAILURE] =
  createRequestActionTypes('find/FIND_PASSWORD');

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

export const findId = createAction(FIND_ID, ({ email }) => ({
  email
}));

export const findQuestion = createAction(FIND_QUESTION, ({ userId }) => ({
  userId
}));

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
const findIdSaga = createRequestSaga(FIND_ID, api.findId);
const findQuestionSaga = createRequestSaga(FIND_ID, api.findQuestion);
const findPasswordSaga = createRequestSaga(FIND_PASSWORD, api.findPassword);

export function* findSaga() {
  yield takeLatest(FIND_ID, findIdSaga);
  yield takeLatest(FIND_QUESTION, findQuestionSaga);
  yield takeLatest(FIND_PASSWORD, findPasswordSaga);
}

// reducer
const initialState = {
  myEmail: {
    email: ''
  },
  findIdRes: reducerUtils.initial(),
  findQuestionRes: reducerUtils.initial(),
  findPasswordRes: reducerUtils.initial()
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
    [FIND_ID]: state => ({
      ...state,
      findIdRes: reducerUtils.loading(state.findIdRes.data)
    }),
    [FIND_ID_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      findIdRes: reducerUtils.success(response)
    }),
    [FIND_ID_FAILURE]: (state, { payload: error }) => ({
      ...state,
      findIdRes: reducerUtils.error(error)
    }),
    [FIND_QUESTION]: state => ({
      ...state,
      findQuestionRes: reducerUtils.loading(state.findQuestionRes.data)
    }),
    [FIND_QUESTION_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      findQuestionRes: reducerUtils.success(response)
    }),
    [FIND_QUESTION_FAILURE]: (state, { payload: error }) => ({
      ...state,
      findQuestionRes: reducerUtils.error(error)
    }),
    [FIND_PASSWORD]: state => ({
      ...state,
      findPasswordRes: reducerUtils.loading(state.findPasswordRes.data)
    }),
    [FIND_PASSWORD_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      findPasswordRes: reducerUtils.success(response)
    }),
    [FIND_PASSWORD_FAILURE]: (state, { payload: error }) => ({
      ...state,
      findPasswordRes: reducerUtils.error(error)
    })
  },
  initialState
);
