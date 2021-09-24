import { createAction, handleActions } from 'redux-actions';

const INITIALIZE = 'feedback/INITIALIZE';
const NORMAL_FEEDBACK = 'feedback/NORMAL_FEEDBACK';
const SUCCESS_FEEDBACK = 'feedback/SUCCESS_FEEDBACK';
const ALERT_FEEDBACK = 'feedback/ALERT_FEEDBACK';
const ERROR_FEEDBACK = 'feedback/ERROR_FEEDBACK';

export const initialize = createAction(INITIALIZE);
export const normalFeedback = createAction(NORMAL_FEEDBACK, message => message);
export const successFeedback = createAction(
  SUCCESS_FEEDBACK,
  message => message
);
export const alertFeedback = createAction(ALERT_FEEDBACK, message => message);
export const errorFeedback = createAction(ERROR_FEEDBACK, message => message);

const initialState = {
  normal: '',
  success: '',
  alert: '',
  error: ''
};

export default handleActions(
  {
    [INITIALIZE]: () => initialState,
    [NORMAL_FEEDBACK]: (state, { payload: message }) => ({
      ...state,
      normal: message
    }),
    [SUCCESS_FEEDBACK]: (state, { payload: message }) => ({
      ...state,
      success: message
    }),
    [ALERT_FEEDBACK]: (state, { payload: message }) => ({
      ...state,
      alert: message
    }),
    [ERROR_FEEDBACK]: (state, { payload: message }) => ({
      ...state,
      error: message
    })
  },
  initialState
);
