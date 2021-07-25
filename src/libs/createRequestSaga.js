import { call, put } from 'redux-saga/effects';

export const createRequestActionTypes = type => {
  const [SUCCESS, FAILURE] = [`${type}_SUCCESS`, `${type}_FAILURE`];
  return [type, SUCCESS, FAILURE];
};

export const createRequestSaga = (type, request) => {
  const [SUCCESS, FAILURE] = [`${type}_SUCCESS`, `${type}_FAILURE`];
  return function* saga(action) {
    try {
      const res = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: res.data,
        meta: res
      });
    } catch (err) {
      yield put({
        type: FAILURE,
        payload: err,
        error: true
      });
    }
  };
};
