import { createAction, handleActions } from 'redux-actions';
import { takeLatest, takeEvery } from 'redux-saga/effects';
import * as api from '../../libs/api/attach';
import {
  createRequestActionTypes,
  createRequestSaga
} from '../../libs/createRequestSaga';
import reducerUtils from '../../libs/reducerUtils';

// Actions
const INITIALIZE = 'attach/INITIALIZE';
const INITIALIZE_ADD = 'attach/INITIALIZE_ADD';
const CHANGE_SELECT = 'attach/CHANGE_SELECT';
const [ADD_ATTACH, ADD_ATTACH_SUCCESS, ADD_ATTACH_FAILURE] =
  createRequestActionTypes('attach/ADD_ATTACH');
const [REMOVE_ATTACH, REMOVE_ATTACH_SUCCESS, REMOVE_ATTACH_FAILURE] =
  createRequestActionTypes('attach/REMOVE_ATTACH');

// Action Creators
export const initialize = createAction(INITIALIZE);
export const initializeAdd = createAction(INITIALIZE_ADD);
export const changeSelect = createAction(CHANGE_SELECT, ({ select }) => ({
  select
}));
export const addAttachList = createAction(ADD_ATTACH, ({ files }) => ({
  files
}));
export const removeAttach = createAction(REMOVE_ATTACH, ({ id }) => ({
  id
}));

// Sagas
const addAttachListSaga = createRequestSaga(ADD_ATTACH, api.addAttachList);
const removeAttachSaga = createRequestSaga(REMOVE_ATTACH, api.removeAttach);

export function* attachSaga() {
  yield takeLatest(ADD_ATTACH, addAttachListSaga);
  yield takeEvery(REMOVE_ATTACH, removeAttachSaga);
}

// reducer
const initialState = {
  select: '',
  addAttach: reducerUtils.initial(),
  removeAttach: reducerUtils.initial()
};

export default handleActions(
  {
    [INITIALIZE]: () => initialState,
    [INITIALIZE_ADD]: state => ({
      ...state,
      addAttach: reducerUtils.initial()
    }),
    [CHANGE_SELECT]: (state, { payload: { select } }) => ({
      ...state,
      select
    }),

    [ADD_ATTACH]: state => ({
      ...state,
      addAttach: reducerUtils.loading(state.addAttach.data)
    }),
    [ADD_ATTACH_SUCCESS]: (state, { payload: add }) => ({
      ...state,
      addAttach: reducerUtils.success(add)
    }),
    [ADD_ATTACH_FAILURE]: (state, { payload: error }) => ({
      ...state,
      addAttach: reducerUtils.error(error)
    }),

    [REMOVE_ATTACH]: state => ({
      ...state,
      removeAttach: reducerUtils.loading(state.removeAttach.data)
    }),
    [REMOVE_ATTACH_SUCCESS]: (state, { payload: remove }) => ({
      ...state,
      removeAttach: reducerUtils.success(remove)
    }),
    [REMOVE_ATTACH_FAILURE]: (state, { payload: error }) => ({
      ...state,
      removeAttach: reducerUtils.error(error)
    })
  },
  initialState
);
