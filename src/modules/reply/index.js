import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as api from '../../libs/api/reply';
import {
  createRequestActionTypes,
  createRequestSaga
} from '../../libs/createRequestSaga';
import reducerUtils from '../../libs/reducerUtils';

// Actions
const INITIALIZE = 'reply/INITIALIZE';
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
const [
  LOAD_REPLY_SECRET,
  LOAD_REPLY_SECRET_SUCCESS,
  LOAD_REPLY_SECRET_FAILURE
] = createRequestActionTypes('reply/LOAD_REPLY_SECRET');
const CHANGE_SECRET_REPLY = 'reply/CHANGE_SECRET_REPLY';

// Action Creators
export const initialize = createAction(INITIALIZE);
export const addReply = createAction(
  ADD_REPLY,
  ({ anonymous, isSecret, parentId, postId, text, attachmentList }) => ({
    anonymous,
    isSecret,
    parentId,
    postId,
    text,
    attachmentList
  })
);
export const updateReply = createAction(
  UPDATE_REPLY,
  ({ password, isSecret, replyId, text, attachmentList }) => ({
    password,
    isSecret,
    replyId,
    text,
    attachmentList
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
export const loadSecretReply = createAction(
  LOAD_REPLY_SECRET,
  ({ password, replyId }) => ({
    password,
    replyId
  })
);
export const changeSecretReply = createAction(
  CHANGE_SECRET_REPLY,
  ({ parentIndex, replyIndex }) => ({ parentIndex, replyIndex })
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
const loadSecretReplySaga = createRequestSaga(
  LOAD_REPLY_SECRET,
  api.getSecretReply
);

export function* replySaga() {
  yield takeLatest(ADD_REPLY, addReplySaga);
  yield takeLatest(UPDATE_REPLY, updateReplySaga);
  yield takeLatest(REMOVE_REPLY, removeReplySaga);
  yield takeLatest(LOAD_REPLY_BY_ID, loadReplyByIdSaga);
  yield takeLatest(REMOVE_REPLY_ANONY, removeReplyAnonySaga);
  yield takeLatest(LOAD_REPLY_LIST, loadReplyListSaga);
  yield takeLatest(LOAD_REPLY_SECRET, loadSecretReplySaga);
}

// reducer
const initialState = {
  addReply: reducerUtils.initial(),
  updateReply: reducerUtils.initial(),
  removeReply: reducerUtils.initial(),
  loadReplyById: reducerUtils.initial(),
  loadReplyList: reducerUtils.initial(),
  loadSecretReply: reducerUtils.initial()
};

export default handleActions(
  {
    [INITIALIZE]: () => initialState,
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
      loadReplyById: reducerUtils.loading(state.loadReplyById.data)
    }),
    [LOAD_REPLY_BY_ID_SUCCESS]: (state, { payload: reply }) => ({
      ...state,
      loadReplyById: reducerUtils.success(reply)
    }),
    [LOAD_REPLY_BY_ID_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadReplyById: reducerUtils.error(error)
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
    }),

    [LOAD_REPLY_SECRET]: state => ({
      ...state,
      loadSecretReply: reducerUtils.loading(state.loadSecretReply.data)
    }),
    [LOAD_REPLY_SECRET_SUCCESS]: (state, { payload: secretReply }) => ({
      ...state,
      loadSecretReply: reducerUtils.success(secretReply)
    }),
    [LOAD_REPLY_SECRET_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadSecretReply: reducerUtils.error(error)
    }),

    [CHANGE_SECRET_REPLY]: (
      state,
      { payload: { parentIndex, replyIndex } }
    ) => {
      if (parentIndex !== '') {
        return produce(state, draft => {
          draft.loadReplyList.data.data[parentIndex].child[replyIndex].text =
            state.loadSecretReply.data.data.text;
          draft.loadReplyList.data.data[parentIndex].child[
            replyIndex
          ].isSecret = 'NORMAL';
        });
      }
      return produce(state, draft => {
        draft.loadReplyList.data.data[replyIndex].text =
          state.loadSecretReply.data.data.text;
        draft.loadReplyList.data.data[replyIndex].isSecret = 'NORMAL';
      });
    }
  },
  initialState
);
