import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';
import * as api from '../../libs/api/post';
import {
  createRequestActionTypes,
  createRequestSaga
} from '../../libs/createRequestSaga';
import reducerUtils from '../../libs/reducerUtils';

// Actions
const INITIALIZE = 'post/INITIALIZE';

const INITIALIZE_FORM = 'post/INITIALIZE_FORM';

const CHANGE_FIELD = 'post/CHANGE_FIELD';

const [
  LOAD_NORMAL_POST_LIST,
  LOAD_NORMAL_POST_LIST_SUCCESS,
  LOAD_NORMAL_POST_LIST_FAILURE
] = createRequestActionTypes('post/LOAD_NORMAL_POST_LIST');

const [
  LOAD_NOTICE_POST_LIST,
  LOAD_NOTICE_POST_LIST_SUCCESS,
  LOAD_NOTICE_POST_LIST_FAILURE
] = createRequestActionTypes('post/LOAD_NOTICE_POST_LIST');

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

const [ADD_POST, ADD_POST_SUCCESS, ADD_POST_FAILURE] =
  createRequestActionTypes('post/ADD_POST');

const [UPDATE_POST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE] =
  createRequestActionTypes('post/UPDATE_POST');

const [POST_REPORT, POST_REPORT_SUCCESS, POST_REPORT_FAILURE] =
  createRequestActionTypes('post/POST_REPORT');

// Action Creators
export const initialize = createAction(INITIALIZE);

export const initializeForm = createAction(INITIALIZE_FORM);

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value
  })
);

export const loadNormalpostList = createAction(
  LOAD_NORMAL_POST_LIST,
  ({ boardNameEng, direction, isNotice, page, size }) => ({
    boardNameEng,
    direction,
    isNotice,
    page,
    size
  })
);

export const loadNoticepostList = createAction(
  LOAD_NOTICE_POST_LIST,
  ({ boardNameEng, direction, isNotice, page, size }) => ({
    boardNameEng,
    direction,
    isNotice,
    page,
    size
  })
);

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

export const addPost = createAction(
  ADD_POST,
  ({
    anonymous,
    attachmentList,
    boardNameEng,
    isNotice,
    isSecret,
    postContent,
    tagList
  }) => ({
    anonymous,
    attachmentList,
    boardNameEng,
    isNotice,
    isSecret,
    postContent,
    tagList
  })
);

export const updatePost = createAction(
  UPDATE_POST,
  ({
    postId,
    anonymousPassword,
    attachmentList,
    boardNameEng,
    isNotice,
    isSecret,
    postContent,
    tagList
  }) => ({
    postId,
    anonymousPassword,
    attachmentList,
    boardNameEng,
    isNotice,
    isSecret,
    postContent,
    tagList
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
const loadNormalpostListSaga = createRequestSaga(
  LOAD_NORMAL_POST_LIST,
  api.loadNormalpostList
);
const loadNoticepostListSaga = createRequestSaga(
  LOAD_NOTICE_POST_LIST,
  api.loadNormalpostList
);
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
const addPostSaga = createRequestSaga(ADD_POST, api.addPost);
const updatePostSaga = createRequestSaga(UPDATE_POST, api.updatePost);
const postReportSaga = createRequestSaga(POST_REPORT, api.reportPost);

export function* postSaga() {
  yield takeLatest(LOAD_NORMAL_POST_LIST, loadNormalpostListSaga);
  yield takeLatest(LOAD_NOTICE_POST_LIST, loadNoticepostListSaga);
  yield takeLatest(SEARCH_POST, searchPostSaga);
  yield takeLatest(LOAD_POST, loadPostSaga);
  yield takeLatest(LOAD_SECRET_POST, loadSecretPostSaga);
  yield takeLatest(POST_DELETE, postDeleteSaga);
  yield takeLatest(ANONYMOUS_POST_DELETE, anonymousPostDeleteSaga);
  yield takeLatest(ADD_POST, addPostSaga);
  yield takeLatest(UPDATE_POST, updatePostSaga);
  yield takeLatest(POST_REPORT, postReportSaga);
}

// reducer (handleActions => switch문 대체)
const initialState = {
  addForm: {
    anonymousNickname: '',
    anonymousPassword: '',
    attachmentList: [],
    isNotice: 'NORMAL',
    isSecret: 'NORMAL',
    text: '',
    title: '',
    tagList: []
  },
  updateForm: {
    anonymousPassword: '',
    attachmentList: [],
    isNotice: 'NORMAL',
    isSecret: 'NORMAL',
    text: '',
    title: '',
    tagList: []
  },
  loadedNormalPostList: reducerUtils.initial(),
  loadedNoticePostList: reducerUtils.initial(),
  loadedPost: reducerUtils.initial(),
  postDeleteRes: reducerUtils.initial(),
  addPost: reducerUtils.initial(),
  updatePost: reducerUtils.initial(),
  reportRes: reducerUtils.initial()
};

export default handleActions(
  {
    [INITIALIZE]: () => initialState,
    [INITIALIZE_FORM]: state => ({
      ...state,
      addForm: {
        anonymousNickname: '',
        anonymousPassword: '',
        attachmentList: [],
        isNotice: 'NORMAL',
        isSecret: 'NORMAL',
        text: '',
        title: '',
        tagList: []
      },
      updateForm: {
        anonymousPassword: '',
        attachmentList: [],
        isNotice: 'NORMAL',
        isSecret: 'NORMAL',
        text: '',
        title: '',
        tagList: []
      }
    }),
    [CHANGE_FIELD]: (state, { payload: { key, form, value } }) =>
      produce(state, draft => {
        draft[form][key] = value;
      }),
    [LOAD_NORMAL_POST_LIST]: state => ({
      ...state,
      loadedNormalPostList: reducerUtils.loading(
        state.loadedNormalPostList.data
      )
    }),
    [LOAD_NORMAL_POST_LIST_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      loadedNormalPostList: reducerUtils.success(response)
    }),
    [LOAD_NORMAL_POST_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadedNormalPostList: reducerUtils.error(error)
    }),
    [LOAD_NOTICE_POST_LIST]: state => ({
      ...state,
      loadedNoticePostList: reducerUtils.loading(
        state.loadedNoticePostList.data
      )
    }),
    [LOAD_NOTICE_POST_LIST_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      loadedNoticePostList: reducerUtils.success(response)
    }),
    [LOAD_NOTICE_POST_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadedNoticePostList: reducerUtils.error(error)
    }),
    [SEARCH_POST]: state => ({
      ...state,
      loadedNormalPostList: reducerUtils.loading(
        state.loadedNormalPostList.data
      )
    }),
    [SEARCH_POST_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      loadedNormalPostList: reducerUtils.success(response)
    }),
    [SEARCH_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadedNormalPostList: reducerUtils.error(error)
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
    [ADD_POST]: state => ({
      ...state,
      addPost: reducerUtils.loading(state.addPost.data)
    }),
    [ADD_POST_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      addPost: reducerUtils.success(response)
    }),
    [ADD_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      addPost: reducerUtils.error(error)
    }),
    [UPDATE_POST]: state => ({
      ...state,
      updatePost: reducerUtils.loading(state.updatePost.data)
    }),
    [UPDATE_POST_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      updatePost: reducerUtils.success(response)
    }),
    [UPDATE_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      updatePost: reducerUtils.error(error)
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
