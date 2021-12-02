import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import reducerUtils from '../../libs/reducerUtils';

// Actions
const INITIALIZE = 'replyForm/INITIALIZE';
const INITIALIZE_ADD = 'replyForm/INITIALIZE_ADD';
const INITIALIZE_UPDATE = 'replyForm/INITIALIZE_UPDATE';
const INITIALIZE_DELETE = 'replyForm/INITIALIZE_DELETE';
const INITIALIZE_SECRET = 'replyForm/INITIALIZE_SECRET';
const CHANGE_FIELD = 'replyForm/CHANGE_FIELD';
const CHANGE_UPDATE = 'replyForm/CHANGE_UPDATE';

// Action Creators
export const initialize = createAction(INITIALIZE);
export const initializeRemove = createAction(INITIALIZE_DELETE);
export const initializeAdd = createAction(INITIALIZE_ADD);
export const initializeUpdate = createAction(INITIALIZE_UPDATE);
export const initializeSecret = createAction(INITIALIZE_SECRET);

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value
  })
);
export const changeUpdate = createAction(
  CHANGE_UPDATE,
  ({ isSecret, text, attachmentList }) => ({ isSecret, text, attachmentList })
);
// Sagas

// reducer
const initialState = {
  addForm: {
    anonymousNickname: '',
    anonymousPassword: '',
    isSecret: 'NORMAL',
    text: '',
    attachmentList: []
  },
  addChildForm: {
    parentId: '',
    anonymousNickname: '',
    anonymousPassword: '',
    isSecret: 'NORMAL',
    text: '',
    attachmentList: []
  },
  updateForm: {
    password: '',
    isSecret: '',
    parentId: 1,
    postId: null,
    text: '',
    attachmentList: []
  },
  removeForm: {
    password: ''
  },
  loadSecretForm: {
    password: '',
    parentIndex: '',
    replyIndex: ''
  }
};

export default handleActions(
  {
    [INITIALIZE]: () => initialState,
    [INITIALIZE_DELETE]: state => ({
      ...state,
      removeReply: reducerUtils.initial()
    }),
    [INITIALIZE_ADD]: state => ({
      ...state,
      addReply: reducerUtils.initial()
    }),
    [INITIALIZE_UPDATE]: state => ({
      ...state,
      updateReply: reducerUtils.initial()
    }),
    [INITIALIZE_SECRET]: state => ({
      ...state,
      loadSecretReply: reducerUtils.initial()
    }),
    [CHANGE_FIELD]: (state, { payload: { key, form, value } }) =>
      produce(state, draft => {
        draft[form][key] = value;
      }),
    [CHANGE_UPDATE]: (
      state,
      { payload: { isSecret, text, attachmentList } }
    ) => ({
      ...state,
      updateForm: {
        ...state.updateForm,
        isSecret,
        text,
        attachmentList
      }
    })
  },
  initialState
);
