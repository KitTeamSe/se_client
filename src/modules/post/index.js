import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as api from '../../libs/api/post';
import {
  createRequestActionTypes,
  createRequestSaga
} from '../../libs/createRequestSaga';

// Actions
const INITIALIZE = 'post/INITIALIZE';

const [LOAD_POST_LIST, LOAD_POST_LIST_SUCCESS, LOAD_POST_LIST_FAILURE] =
  createRequestActionTypes('post/LOAD_POST_LIST');

const [LOAD_MENU_LIST, LOAD_MENU_LIST_SUCCESS, LOAD_MENU_LIST_FAILURE] =
  createRequestActionTypes('post/LOAD_MENU_LIST');

const [SEARCH_POST, SEARCH_POST_SUCCESS, SEARCH_POST_FAILURE] =
  createRequestActionTypes('post/SEARCH_POST');

const BOARD_CHANGE = 'post/BOARD_CHANGE';

// Action Creators
export const initialize = createAction(INITIALIZE);

export const loadPostList = createAction(
  LOAD_POST_LIST,
  ({ boardId, direction, page, size }) => ({ boardId, direction, page, size })
);

export const loadMenuList = createAction(LOAD_MENU_LIST);

export const searchPost = createAction(
  SEARCH_POST,
  ({ postSearchRequest }) => ({
    postSearchRequest
  })
);

export const boardChange = createAction(BOARD_CHANGE, ({ value }) => ({
  value
}));

// Sagas
const loadPostListSaga = createRequestSaga(LOAD_POST_LIST, api.loadPostList);
const loadMenuListSage = createRequestSaga(LOAD_MENU_LIST, api.loadMenuList);
const searchPostSaga = createRequestSaga(SEARCH_POST, api.searchPost);

export function* postSaga() {
  yield takeLatest(LOAD_POST_LIST, loadPostListSaga);
  yield takeLatest(LOAD_MENU_LIST, loadMenuListSage);
  yield takeLatest(SEARCH_POST, searchPostSaga);
}

// reducer (handleActions => switch문 대체)
const initialState = {
  nowPage: 1,
  loadPostList: null,
  loadPostError: null,
  loadMenuList: null,
  loadMenuListError: null,
  selectBoard: { value: {} }
};

export default handleActions(
  {
    [INITIALIZE]: () => state => ({
      ...state,
      nowPage: 1,
      loadPostList: null,
      loadPostError: null,
      loadMenuListError: null,
      selectBoard: { value: {} }
    }),
    [BOARD_CHANGE]: (state, { payload: value }) => ({
      ...state,
      selectBoard: value,
      loadPostList: null
    }),
    [LOAD_POST_LIST_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      loadPostList: response.data,
      loadPostError: null
    }),
    [LOAD_POST_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadPostError: error,
      loadPostList: null
    }),
    [LOAD_MENU_LIST_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      loadMenuList: response.data,
      loadMenuListError: null
    }),
    [LOAD_MENU_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadMenuListError: error,
      menuLloadMenuListist: null
    }),
    [SEARCH_POST_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      loadPostList: response.data,
      loadPostError: null
    }),
    [SEARCH_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadPostError: error,
      loadPostList: null
    })
  },
  initialState
);
