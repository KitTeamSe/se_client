import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// Actions
const INITIALIZE_FORM = 'authForm/INITIALIZE_FORM';
const CHANGE_FIELD = 'authForm/CHANGE_FIELD';

// Action Creators
export const initializeForm = createAction(INITIALIZE_FORM, form => form);
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({ form, key, value })
);
// Sagas

// reducer
const initialState = {
  signupForm: {
    answer: '',
    email: '',
    id: '',
    name: '',
    nickname: '',
    password: '',
    checkPassword: '',
    phoneNumber: '',
    questionId: 1,
    studentId: '',
    type: 'STUDENT'
  },
  signinForm: {
    id: '',
    pw: ''
  }
};

export default handleActions(
  {
    [INITIALIZE_FORM]: () => initialState,
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value;
      })
  },
  initialState
);
