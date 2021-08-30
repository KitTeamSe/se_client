import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as api from '../../libs/api/post';
import {
  createRequestActionTypes,
  createRequestSaga
} from '../../libs/createRequestSaga';
import reducerUtils from '../../libs/reducerUtils';

// Actions
const INITIALIZE = 'post/INITIALIZE';

const [LOAD_POST_LIST, LOAD_POST_LIST_SUCCESS, LOAD_POST_LIST_FAILURE] =
  createRequestActionTypes('post/LOAD_POST_LIST');

const [LOAD_MENU_LIST, LOAD_MENU_LIST_SUCCESS, LOAD_MENU_LIST_FAILURE] =
  createRequestActionTypes('post/LOAD_MENU_LIST');

const [SEARCH_POST, SEARCH_POST_SUCCESS, SEARCH_POST_FAILURE] =
  createRequestActionTypes('post/SEARCH_POST');

const [LOAD_POST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE] =
  createRequestActionTypes('post/LOAD_POST');

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

export const loadPost = createAction(LOAD_POST, ({ id }) => ({
  id
}));

// Sagas
const loadPostListSaga = createRequestSaga(LOAD_POST_LIST, api.loadPostList);
const loadMenuListSage = createRequestSaga(LOAD_MENU_LIST, api.loadMenuList);
const searchPostSaga = createRequestSaga(SEARCH_POST, api.searchPost);
const loadPostSaga = createRequestSaga(LOAD_POST, api.loadPost);

export function* postSaga() {
  yield takeLatest(LOAD_POST_LIST, loadPostListSaga);
  yield takeLatest(LOAD_MENU_LIST, loadMenuListSage);
  yield takeLatest(SEARCH_POST, searchPostSaga);
  yield takeLatest(LOAD_POST, loadPostSaga);
}

// reducer (handleActions => switch문 대체)
const initialState = {
  loadedPostList: reducerUtils.initial(),
  loadedMenuList: reducerUtils.initial(),
  loadedPost: reducerUtils.initial()
};

export default handleActions(
  {
    [INITIALIZE]: () => initialState,
    [LOAD_POST_LIST]: state => ({
      ...state,
      loadedPostList: reducerUtils.loading(state.loadedPostList.data)
    }),
    [LOAD_POST_LIST_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      loadedPostList: reducerUtils.success(response)
    }),
    [LOAD_POST_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadedPostList: reducerUtils.error(error)
    }),
    [LOAD_MENU_LIST]: state => ({
      ...state,
      loadedMenuList: reducerUtils.loading(state.loadedMenuList.data)
    }),
    [LOAD_MENU_LIST_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      loadedMenuList: reducerUtils.success(response)
    }),
    [LOAD_MENU_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadedMenuList: reducerUtils.error(error)
    }),
    [SEARCH_POST]: state => ({
      ...state,
      loadedPostList: reducerUtils.loading(state.loadedPostList.data)
    }),
    [SEARCH_POST_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      loadedPostList: reducerUtils.success(response)
    }),
    [SEARCH_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadedPostList: reducerUtils.error(error)
    }),
    [LOAD_POST]: state => ({
      ...state,
      loadedPost: reducerUtils.loading(state.loadedPost.data)
    }),
    [LOAD_POST_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      loadedPost: reducerUtils.success(response)
    }),
    [LOAD_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadedPost: reducerUtils.error(error)
    })
  },
  initialState
);
