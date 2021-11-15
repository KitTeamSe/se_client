import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as api from '../../libs/api/report';
import {
  createRequestActionTypes,
  createRequestSaga
} from '../../libs/createRequestSaga';
import reducerUtils from '../../libs/reducerUtils';

const INITIALIZE = 'report/INITIALIZE';
const INITIALIZE_FORM = 'report/INITIALIZE_FORM';
const CHANGE_TYPE = 'report/CHANGE_TYPE';
const CHANGE_TARGET_NAME = 'report/CHANGE_TARGET_NAME';
const CHANGE_TARGET_ID = 'report/CHANGE_TARGET_ID';
const [ADD_REPORT, ADD_REPORT_SUCCESS, ADD_REPORT_FAILURE] =
  createRequestActionTypes('report/ADD_REPORT');

export const initialize = createAction(INITIALIZE);
export const initializeForm = createAction(INITIALIZE_FORM);
export const changeType = createAction(CHANGE_TYPE, type => type);
export const changeTargetName = createAction(CHANGE_TARGET_NAME, name => name);
export const changeTargetId = createAction(
  CHANGE_TARGET_ID,
  targetId => targetId
);
export const addReport = createAction(
  ADD_REPORT,
  ({ description, reportType, targetId }) => ({
    description,
    reportType,
    targetId
  })
);

const addReportSaga = createRequestSaga(ADD_REPORT, api.reportPost);

export function* reportSaga() {
  yield takeLatest(ADD_REPORT, addReportSaga);
}

// reducer
const initialState = {
  reportType: '', // POST, REPLY
  targetName: '',
  targetId: '',
  reportRes: reducerUtils.initial()
};

export default handleActions(
  {
    [INITIALIZE]: () => initialState,
    [INITIALIZE_FORM]: state => ({
      ...state,
      reportType: null,
      replyId: null
    }),
    [CHANGE_TYPE]: (state, { payload: type }) => ({
      ...state,
      reportType: type
    }),
    [CHANGE_TARGET_NAME]: (state, { payload: name }) => ({
      ...state,
      targetName: name
    }),
    [CHANGE_TARGET_ID]: (state, { payload: targetId }) => ({
      ...state,
      targetId
    }),
    [ADD_REPORT]: state => ({
      ...state,
      reportRes: reducerUtils.loading(state.reportRes.data)
    }),
    [ADD_REPORT_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      reportRes: reducerUtils.success(response)
    }),
    [ADD_REPORT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      reportRes: reducerUtils.error(error)
    })
  },
  initialState
);
