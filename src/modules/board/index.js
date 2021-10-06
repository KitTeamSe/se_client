import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';
import * as api from '../../libs/api/board';
import {
  createRequestActionTypes,
  createRequestSaga
} from '../../libs/createRequestSaga';
import reducerUtils from '../../libs/reducerUtils';

// Actions
const INITIALIZE = 'board/INITIALIZE';

const INITIALIZE_FORM = 'board/INITIALIZE_FORM';

const CHANGE_FIELD = 'board/CHANGE_FIELD';

const [
  LOAD_NORMAL_POST_LIST,
  LOAD_NORMAL_POST_LIST_SUCCESS,
  LOAD_NORMAL_POST_LIST_FAILURE
] = createRequestActionTypes('board/LOAD_NORMAL_POST_LIST');

const [
  LOAD_NOTICE_POST_LIST,
  LOAD_NOTICE_POST_LIST_SUCCESS,
  LOAD_NOTICE_POST_LIST_FAILURE
] = createRequestActionTypes('board/LOAD_NOTICE_POST_LIST');

const [SEARCH_POST, SEARCH_POST_SUCCESS, SEARCH_POST_FAILURE] =
  createRequestActionTypes('board/SEARCH_POST');

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

// Sagas
const loadNormalpostListSaga = createRequestSaga(
  LOAD_NORMAL_POST_LIST,
  api.loadPostList
);
const loadNoticepostListSaga = createRequestSaga(
  LOAD_NOTICE_POST_LIST,
  api.loadPostList
);
const searchPostSaga = createRequestSaga(SEARCH_POST, api.searchPost);

export function* boardSaga() {
  yield takeLatest(LOAD_NORMAL_POST_LIST, loadNormalpostListSaga);
  yield takeLatest(LOAD_NOTICE_POST_LIST, loadNoticepostListSaga);
  yield takeLatest(SEARCH_POST, searchPostSaga);
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
    })
  },
  initialState
);
