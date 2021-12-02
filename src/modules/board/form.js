import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// Actions
const INITIALIZE_FORM = 'boardForm/INITIALIZE_FORM';
const CHANGE_FIELD = 'boardForm/CHANGE_FIELD';

// Action Creators
export const initialize = createAction(INITIALIZE_FORM);
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value
  })
);

// Sagas

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
  }
};

export default handleActions(
  {
    [INITIALIZE_FORM]: () => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, form, value } }) =>
      produce(state, draft => {
        draft[form][key] = value;
      })
  },
  initialState
);
