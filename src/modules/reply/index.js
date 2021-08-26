import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';
import * as api from '../../libs/api/reply';
import {
  createRequestActionTypes,
  createRequestSaga
} from '../../libs/createRequestSaga';
import reducerUtils from '../../libs/reducerUtils';

// Actions
const INITIALIZE = 'reply/INITIALIZE';
const INITIALIZE_FIELD = 'reply/INITIALIZE_FIELD';
const CHANGE_FIELD = 'reply/CHANGE_FIELD';
const [ADD_REPLY, ADD_REPLY_SUCCESS, ADD_REPLY_FAILURE] =
  createRequestActionTypes('reply/ADD_REPLY');
const [UPDATE_REPLY, UPDATE_REPLY_SUCCESS, UPDATE_REPLY_FAILURE] =
  createRequestActionTypes('reply/UPDATE_REPLY');
const [REMOVE_REPLY, REMOVE_REPLY_SUCCESS, REMOVE_REPLY_FAILURE] =
  createRequestActionTypes('reply/REMOVE_REPLY');
const [LOAD_REPLY_BY_ID, LOAD_REPLY_BY_ID_SUCCESS, LOAD_REPLY_BY_ID_FAILURE] =
  createRequestActionTypes('reply/LOAD_REPLY_BY_ID');
const [
  REMOVE_REPLY_ANONY,
  REMOVE_REPLY_ANONY_SUCCESS,
  REMOVE_REPLY_ANONY_FAILURE
] = createRequestActionTypes('reply/REMOVE_REPLY_ANONY');
const [LOAD_REPLY_LIST, LOAD_REPLY_LIST_SUCCESS, LOAD_REPLY_LIST_FAILURE] =
  createRequestActionTypes('reply/LOAD_REPLY_LIST');

// Action Creators
export const initialize = createAction(INITIALIZE);
export const initializeField = createAction(INITIALIZE_FIELD);
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value
  })
);
export const addReply = createAction(
  ADD_REPLY,
  ({ anonymous, isSecret, parentId, postId, text, files }) => ({
    anonymous,
    isSecret,
    parentId,
    postId,
    text,
    files
  })
);
export const updateReply = createAction(
  UPDATE_REPLY,
  ({ anonymous, isSecret, parentId, postId, text, files }) => ({
    anonymous,
    isSecret,
    parentId,
    postId,
    text,
    files
  })
);
export const removeReply = createAction(REMOVE_REPLY, ({ id }) => ({
  id
}));
export const loadReplyById = createAction(LOAD_REPLY_BY_ID, ({ replyId }) => ({
  replyId
}));
export const removeReplyAnony = createAction(
  REMOVE_REPLY_ANONY,
  ({ password, replyId }) => ({ password, replyId })
);
export const loadReplyList = createAction(
  LOAD_REPLY_LIST,
  ({ postId, direction, page, size }) => ({
    postId,
    direction,
    page,
    size
  })
);

// Sagas
const addReplySaga = createRequestSaga(ADD_REPLY, api.addReply);
const updateReplySaga = createRequestSaga(UPDATE_REPLY, api.updateReply);
const removeReplySaga = createRequestSaga(REMOVE_REPLY, api.removeReply);
const loadReplyByIdSaga = createRequestSaga(LOAD_REPLY_BY_ID, api.getReplyById);
const removeReplyAnonySaga = createRequestSaga(
  REMOVE_REPLY_ANONY,
  api.removeReplyAnony
);
const loadReplyListSaga = createRequestSaga(LOAD_REPLY_LIST, api.getReplyList);

export function* replySaga() {
  yield takeLatest(ADD_REPLY, addReplySaga);
  yield takeLatest(UPDATE_REPLY, updateReplySaga);
  yield takeLatest(REMOVE_REPLY, removeReplySaga);
  yield takeLatest(LOAD_REPLY_BY_ID, loadReplyByIdSaga);
  yield takeLatest(REMOVE_REPLY_ANONY, removeReplyAnonySaga);
  yield takeLatest(LOAD_REPLY_LIST, loadReplyListSaga);
}

// reducer (handleActions => switch문 대체)
const initialState = {
  addForm: {
    anonymousNickname: '',
    anonymousPassword: '',
    isSecret: 'NORMAL',
    text: '',
    files: []
  },
  updateForm: {
    password: '',
    isSecret: '',
    parentId: null,
    postId: null,
    text: ''
  },
  addReply: reducerUtils.initial(),
  updateReply: reducerUtils.initial(),
  removeReply: reducerUtils.initial(),
  loadReplyById: reducerUtils.initial(),
  loadReplyList: reducerUtils.initial()
};

export default handleActions(
  {
    [INITIALIZE]: () => initialState,
    [INITIALIZE_FIELD]: state => ({
      ...state,
      addForm: {
        anonymousNickname: '',
        anonymousPassword: '',
        isSecret: 'NORMAL',
        text: '',
        files: []
      },
      updateForm: {
        password: '',
        isSecret: '',
        parentId: null,
        postId: null,
        text: ''
      }
    }),
    [CHANGE_FIELD]: (state, { payload: { key, form, value } }) =>
      produce(state, draft => {
        draft[form][key] = value;
      }),

    [ADD_REPLY]: state => ({
      ...state,
      addReply: reducerUtils.loading(state.addReply.data)
    }),
    [ADD_REPLY_SUCCESS]: (state, { payload: add }) => ({
      ...state,
      addReply: reducerUtils.success(add)
    }),
    [ADD_REPLY_FAILURE]: (state, { payload: error }) => ({
      ...state,
      addReply: reducerUtils.error(error)
    }),

    [UPDATE_REPLY]: state => ({
      ...state,
      updateReply: reducerUtils.loading(state.updateReply.data)
    }),
    [UPDATE_REPLY_SUCCESS]: (state, { payload: update }) => ({
      ...state,
      updateReply: reducerUtils.success(update)
    }),
    [UPDATE_REPLY_FAILURE]: (state, { payload: error }) => ({
      ...state,
      updateReply: reducerUtils.error(error)
    }),

    [REMOVE_REPLY]: state => ({
      ...state,
      removeReply: reducerUtils.loading(state.removeReply.data)
    }),
    [REMOVE_REPLY_SUCCESS]: (state, { payload: remove }) => ({
      ...state,
      removeReply: reducerUtils.success(remove)
    }),
    [REMOVE_REPLY_FAILURE]: (state, { payload: error }) => ({
      ...state,
      removeReply: reducerUtils.error(error)
    }),

    [LOAD_REPLY_BY_ID]: state => ({
      ...state,
      loadReplyById: reducerUtils.loading(state.loadReply.data)
    }),
    [LOAD_REPLY_BY_ID_SUCCESS]: (state, { payload: reply }) => ({
      ...state,
      loadReply: reducerUtils.success(reply)
    }),
    [LOAD_REPLY_BY_ID_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadReply: reducerUtils.error(error)
    }),

    [REMOVE_REPLY_ANONY]: state => ({
      ...state,
      removeReply: reducerUtils.loading(state.removeReply.data)
    }),
    [REMOVE_REPLY_ANONY_SUCCESS]: (state, { payload: remove }) => ({
      ...state,
      removeReply: reducerUtils.success(remove)
    }),
    [REMOVE_REPLY_ANONY_FAILURE]: (state, { payload: error }) => ({
      ...state,
      removeReply: reducerUtils.error(error)
    }),

    [LOAD_REPLY_LIST]: state => ({
      ...state,
      loadReplyList: reducerUtils.loading(state.loadReplyList.data)
    }),
    [LOAD_REPLY_LIST_SUCCESS]: (state, { payload: replyList }) => ({
      ...state,
      loadReplyList: reducerUtils.success(replyList)
    }),
    [LOAD_REPLY_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadReplyList: reducerUtils.error(error)
    })
  },
  initialState
);
