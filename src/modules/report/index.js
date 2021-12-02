import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as api from '../../libs/api/report';
import {
  createRequestActionTypes,
  createRequestSaga
} from '../../libs/createRequestSaga';
import reducerUtils from '../../libs/reducerUtils';

const INITIALIZE = 'report/INITIALIZE';
const [ADD_REPORT, ADD_REPORT_SUCCESS, ADD_REPORT_FAILURE] =
  createRequestActionTypes('report/ADD_REPORT');

export const initialize = createAction(INITIALIZE);
export const addReport = createAction(
  ADD_REPORT,
  ({ description, reportType, targetId }) => ({
    description,
    reportType,
    targetId
  })
);

const addReportSaga = createRequestSaga(ADD_REPORT, api.addReport);

export function* reportSaga() {
  yield takeLatest(ADD_REPORT, addReportSaga);
}

// reducer
const initialState = {
  reportRes: reducerUtils.initial()
};

export default handleActions(
  {
    [INITIALIZE]: () => initialState,
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
