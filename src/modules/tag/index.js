import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as api from '../../libs/api/tag';
import {
  createRequestActionTypes,
  createRequestSaga
} from '../../libs/createRequestSaga';
import reducerUtils from '../../libs/reducerUtils';

// Actions
const INITIALIZE = 'tag/INITIALIZE';
const CHANGE_TEXT = 'tag/CHANGE_TEXT';
const [SEARCH_TAG, SEARCH_TAG_SUCCESS, SEARCH_TAG_FAILURE] =
  createRequestActionTypes('tag/SEARCH_TAG');

// Action Creators
export const initialize = createAction(INITIALIZE);
export const changeText = createAction(CHANGE_TEXT, ({ searchText }) => ({
  searchText
}));
export const searchTag = createAction(SEARCH_TAG, ({ text }) => ({
  text
}));

// Sagas
const searchTagSaga = createRequestSaga(SEARCH_TAG, api.searchTag);

export function* tagSaga() {
  yield takeLatest(SEARCH_TAG, searchTagSaga);
}

// reducer
const initialState = {
  searchText: '',
  searchTag: reducerUtils.initial()
};

export default handleActions(
  {
    [INITIALIZE]: () => initialState,
    [CHANGE_TEXT]: (state, { payload: { searchText } }) => ({
      ...state,
      searchText
    }),

    [SEARCH_TAG]: state => ({
      ...state,
      searchTag: reducerUtils.loading(state.searchTag.data)
    }),
    [SEARCH_TAG_SUCCESS]: (state, { payload: add }) => ({
      ...state,
      searchTag: reducerUtils.success(add)
    }),
    [SEARCH_TAG_FAILURE]: (state, { payload: error }) => ({
      ...state,
      searchTag: reducerUtils.error(error)
    })
  },
  initialState
);
