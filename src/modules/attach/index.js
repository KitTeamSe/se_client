import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';
import * as api from '../../libs/api/attach';
import {
  createRequestActionTypes,
  createRequestSaga
} from '../../libs/createRequestSaga';
import reducerUtils from '../../libs/reducerUtils';

// Actions
const INITIALIZE = 'attach/INITIALIZE';
const INITIALIZE_FIELD = 'attach/INITIALIZE_FIELD';
const INITIALIZE_ADD = 'attach/INITIALIZE_ADD';
const CHANGE_FIELD = 'attach/CHANGE_FIELD';
const CHANGE_SELECT = 'attach/CHANGE_SELECT';
const [LOAD_ATTACH, LOAD_ATTACH_SUCCESS, LOAD_ATTACH_FAILURE] =
  createRequestActionTypes('attach/LOAD_ATTACH');
const [LOAD_ATTACH_LIST, LOAD_ATTACH_LIST_SUCCESS, LOAD_ATTACH_LIST_FAILURE] =
  createRequestActionTypes('attach/LOAD_ATTACH_LIST');
const [ADD_ATTACH, ADD_ATTACH_SUCCESS, ADD_ATTACH_FAILURE] =
  createRequestActionTypes('attach/ADD_ATTACH');
const [REMOVE_ATTACH, REMOVE_ATTACH_SUCCESS, REMOVE_ATTACH_FAILURE] =
  createRequestActionTypes('attach/REMOVE_ATTACH');
const [
  LOAD_POST_ATTACH_LIST,
  LOAD_POST_ATTACH_LIST_SUCCESS,
  LOAD_POST_ATTACH_LIST_FAILURE
] = createRequestActionTypes('attach/UPDATE_ATTACH');
const [
  LOAD_REPLY_ATTACH_LIST,
  LOAD_REPLY_ATTACH_LIST_SUCCESS,
  LOAD_REPLY_ATTACH_LIST_FAILURE
] = createRequestActionTypes('attach/LOAD_REPLY_ATTACH_LIST');

// Action Creators
export const initialize = createAction(INITIALIZE);
export const initializeField = createAction(INITIALIZE_FIELD);
export const initializeAdd = createAction(INITIALIZE_ADD);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value
}));
export const changeSelect = createAction(CHANGE_SELECT, ({ select }) => ({
  select
}));
export const loadAttach = createAction(LOAD_ATTACH, ({ id }) => ({
  id
}));
export const loadAttachList = createAction(
  LOAD_ATTACH_LIST,
  ({ direction, page, size }) => ({ direction, page, size })
);
export const addAttach = createAction(ADD_ATTACH, ({ files }) => ({
  files
}));
export const addAttachList = createAction(ADD_ATTACH, ({ files }) => ({
  files
}));
export const removeAttach = createAction(REMOVE_ATTACH, ({ id }) => ({
  id
}));
export const loadPostAttachList = createAction(
  LOAD_POST_ATTACH_LIST,
  ({ id }) => ({
    id
  })
);
export const loadReplyAttachList = createAction(
  LOAD_REPLY_ATTACH_LIST,
  ({ id }) => ({
    id
  })
);

// Sagas
const loadAttachSaga = createRequestSaga(LOAD_ATTACH, api.getAttach);
const loadAttachListSaga = createRequestSaga(
  LOAD_ATTACH_LIST,
  api.getAttachList
);
// const addAttachSaga = createRequestSaga(ADD_ATTACH, api.addAttach);
const addAttachListSaga = createRequestSaga(ADD_ATTACH, api.addAttachList);
const removeAttachSaga = createRequestSaga(REMOVE_ATTACH, api.removeAttach);
const getPostAttachListSaga = createRequestSaga(
  REMOVE_ATTACH,
  api.getPostAttachList
);
const getReplyAttachListSaga = createRequestSaga(
  REMOVE_ATTACH,
  api.getReplyAttachList
);

export function* attachSaga() {
  yield takeLatest(LOAD_ATTACH, loadAttachSaga);
  yield takeLatest(LOAD_ATTACH_LIST, loadAttachListSaga);
  // yield takeLatest(ADD_ATTACH, addAttachSaga);
  yield takeLatest(ADD_ATTACH, addAttachListSaga);
  yield takeLatest(REMOVE_ATTACH, removeAttachSaga);
  yield takeLatest(LOAD_POST_ATTACH_LIST, getPostAttachListSaga);
  yield takeLatest(LOAD_REPLY_ATTACH_LIST, getReplyAttachListSaga);
}

// reducer (handleActions => switch문 대체)
const initialState = {
  attach: {
    multipartFile: [],
    postId: '',
    replyId: ''
  },
  attachList: [],
  loadAttach: reducerUtils.initial(),
  loadAttachList: reducerUtils.initial(),
  addAttach: reducerUtils.initial(),
  removeAttach: reducerUtils.initial(),
  loadPostAttachList: reducerUtils.initial(),
  loadReplyAttachList: reducerUtils.initial()
};

export default handleActions(
  {
    [INITIALIZE]: () => initialState,
    [INITIALIZE_FIELD]: state => ({
      ...state,
      attach: {
        multipartFile: [],
        postId: '',
        replyId: ''
      }
    }),
    [INITIALIZE_ADD]: state => ({
      ...state,
      addAttach: reducerUtils.initial()
    }),
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, draft => {
        draft.attach[key] = value;
      }),
    [CHANGE_SELECT]: (state, { payload: { select } }) => ({
      ...state,
      select
    }),
    [LOAD_ATTACH]: state => ({
      ...state,
      loadAttach: reducerUtils.loading(state.loadAttach.data)
    }),
    [LOAD_ATTACH_SUCCESS]: (state, { payload: attach }) => ({
      ...state,
      loadAttach: reducerUtils.success(attach)
    }),
    [LOAD_ATTACH_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadAttach: reducerUtils.error(error)
    }),

    [LOAD_ATTACH_LIST]: state => ({
      ...state,
      loadAttachList: reducerUtils.loading(state.loadAttachList.data)
    }),
    [LOAD_ATTACH_LIST_SUCCESS]: (state, { payload: attachList }) => ({
      ...state,
      loadAttachList: reducerUtils.success(attachList)
    }),
    [LOAD_ATTACH_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadAttachList: reducerUtils.error(error)
    }),

    [ADD_ATTACH]: state => ({
      ...state,
      addAttach: reducerUtils.loading(state.addAttach.data)
    }),
    [ADD_ATTACH_SUCCESS]: (state, { payload: add }) => ({
      ...state,
      attachList: state.attachList.concat(add.data),
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
    }),

    [LOAD_POST_ATTACH_LIST]: state => ({
      ...state,
      loadPostAttachList: reducerUtils.loading(state.loadPostAttachList.data)
    }),
    [LOAD_POST_ATTACH_LIST_SUCCESS]: (state, { payload: attachList }) => ({
      ...state,
      loadPostAttachList: reducerUtils.success(attachList)
    }),
    [LOAD_POST_ATTACH_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadPostAttachList: reducerUtils.error(error)
    }),

    [LOAD_REPLY_ATTACH_LIST]: state => ({
      ...state,
      loadReplyAttachList: reducerUtils.loading(state.loadReplyAttachList.data)
    }),
    [LOAD_REPLY_ATTACH_LIST_SUCCESS]: (state, { payload: attachList }) => ({
      ...state,
      loadReplyAttachList: reducerUtils.success(attachList)
    }),
    [LOAD_REPLY_ATTACH_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadReplyAttachList: reducerUtils.error(error)
    })
  },
  initialState
);
