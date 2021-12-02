import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// Actions
const INITIALIZE_FORM = 'attachForm/INITIALIZE_FORM';
const CHANGE_FIELD = 'attachForm/CHANGE_FIELD';

// Action Creators
export const initialize = createAction(INITIALIZE_FORM);
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({ form, key, value })
);

// Sagas

// reducer
const initialState = {
  attachForm: {
    select: ''
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
