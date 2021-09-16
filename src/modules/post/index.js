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

const [LOAD_SECRET_POST, LOAD_SECRET_POST_SUCCESS, LOAD_SECRET_POST_FAILURE] =
  createRequestActionTypes('post/LOAD_SECRET_POST');

const [POST_DELETE, POST_DELETE_SUCCESS, POST_DELETE_FAILURE] =
  createRequestActionTypes('post/POST_DELETE');

const [
  ANONYMOUS_POST_DELETE,
  ANONYMOUS_POST_DELETE_SUCCESS,
  ANONYMOUS_POST_DELETE_FAILURE
] = createRequestActionTypes('post/ANONYMOUS_POST_DELETE');

const [POST_REPORT, POST_REPORT_SUCCESS, POST_REPORT_FAILURE] =
  createRequestActionTypes('post/POST_REPORT');

// Action Creators
export const initialize = createAction(INITIALIZE, form => form);

export const loadPostList = createAction(
  LOAD_POST_LIST,
  ({ boardNameEng, direction, isNotice, page, size }) => ({
    boardNameEng,
    direction,
    isNotice,
    page,
    size
  })
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

export const loadSecretPost = createAction(
  LOAD_SECRET_POST,
  ({ postId, password }) => ({
    postId,
    password
  })
);

export const postDelete = createAction(POST_DELETE, ({ id }) => ({
  id
}));

export const anonymousPostDelete = createAction(
  ANONYMOUS_POST_DELETE,
  ({ anonymousPassword, postId }) => ({
    anonymousPassword,
    postId
  })
);

export const postReport = createAction(
  POST_REPORT,
  ({ description, reportType, targetId }) => ({
    description,
    reportType,
    targetId
  })
);

// Sagas
const loadPostListSaga = createRequestSaga(LOAD_POST_LIST, api.loadPostList);
const loadMenuListSage = createRequestSaga(LOAD_MENU_LIST, api.loadMenuList);
const searchPostSaga = createRequestSaga(SEARCH_POST, api.searchPost);
const loadPostSaga = createRequestSaga(LOAD_POST, api.loadPost);
const loadSecretPostSaga = createRequestSaga(
  LOAD_SECRET_POST,
  api.loadSecretPost
);
const postDeleteSaga = createRequestSaga(POST_DELETE, api.postDelete);
const anonymousPostDeleteSaga = createRequestSaga(
  ANONYMOUS_POST_DELETE,
  api.anonymousPostDelete
);
const postReportSaga = createRequestSaga(POST_REPORT, api.reportPost);

export function* postSaga() {
  yield takeLatest(LOAD_POST_LIST, loadPostListSaga);
  yield takeLatest(LOAD_MENU_LIST, loadMenuListSage);
  yield takeLatest(SEARCH_POST, searchPostSaga);
  yield takeLatest(LOAD_POST, loadPostSaga);
  yield takeLatest(LOAD_SECRET_POST, loadSecretPostSaga);
  yield takeLatest(POST_DELETE, postDeleteSaga);
  yield takeLatest(ANONYMOUS_POST_DELETE, anonymousPostDeleteSaga);
  yield takeLatest(POST_REPORT, postReportSaga);
}

// reducer (handleActions => switch문 대체)
const initialState = {
  loadedPostList: reducerUtils.initial(),
  loadedMenuList: reducerUtils.initial(),
  loadedPost: reducerUtils.initial(),
  postDeleteRes: reducerUtils.initial(),
  reportRes: reducerUtils.initial()
};

export default handleActions(
  {
    [INITIALIZE]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form]
    }),
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
    }),
    [LOAD_SECRET_POST]: state => ({
      ...state,
      loadedPost: reducerUtils.loading(state.loadedPost.data)
    }),
    [LOAD_SECRET_POST_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      loadedPost: reducerUtils.success(response)
    }),
    [LOAD_SECRET_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadedPost: reducerUtils.error(error)
    }),
    [POST_DELETE]: state => ({
      ...state,
      postDeleteRes: reducerUtils.loading(state.postDeleteRes.data)
    }),
    [POST_DELETE_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      postDeleteRes: reducerUtils.success(response)
    }),
    [POST_DELETE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      postDeleteRes: reducerUtils.error(error)
    }),
    [ANONYMOUS_POST_DELETE]: state => ({
      ...state,
      postDeleteRes: reducerUtils.loading(state.postDeleteRes.data)
    }),
    [ANONYMOUS_POST_DELETE_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      postDeleteRes: reducerUtils.success(response)
    }),
    [ANONYMOUS_POST_DELETE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      postDeleteRes: reducerUtils.error(error)
    }),
    [POST_REPORT]: state => ({
      ...state,
      reportRes: reducerUtils.loading(state.reportRes.data)
    }),
    [POST_REPORT_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      reportRes: reducerUtils.success(response)
    }),
    [POST_REPORT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      reportRes: reducerUtils.error(error)
    })
  },
  initialState
);
