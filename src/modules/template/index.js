import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as api from '../../libs/api/template';
import {
  createRequestActionTypes,
  createRequestSaga
} from '../../libs/createRequestSaga';
import reducerUtils from '../../libs/reducerUtils';

// Actions
const INITIALIZE = 'temp/INITIALIZE';
const [ADD_TEMP, ADD_TEMP_SUCCESS, ADD_TEMP_FAILURE] =
  createRequestActionTypes('temp/ADD_TEMP');
const [LOAD_TEMP, LOAD_TEMP_SUCCESS, LOAD_TEMP_FAILURE] =
  createRequestActionTypes('temp/LOAD_TEMP');
const [UPDATE_TEMP, UPDATE_TEMP_SUCCESS, UPDATE_TEMP_FAILURE] =
  createRequestActionTypes('temp/UPDATE_TEMP');
const [REMOVE_TEMP, REMOVE_TEMP_SUCCESS, REMOVE_TEMP_FAILURE] =
  createRequestActionTypes('temp/REMOVE_TEMP');

// Action Creators
export const initialize = createAction(INITIALIZE);
export const addTemp = createAction(ADD_TEMP, ({ state1, state2, state3 }) => ({
  state1,
  state2,
  state3
}));
export const loadTemp = createAction(LOAD_TEMP, ({ id, search1, search2 }) => ({
  id,
  search1,
  search2
}));
export const updateTemp = createAction(
  UPDATE_TEMP,
  ({ state1, state2, state3 }) => ({
    state1,
    state2,
    state3
  })
);
export const removeTemp = createAction(REMOVE_TEMP, ({ id }) => ({
  id
}));

// Sagas
const addTempSaga = createRequestSaga(ADD_TEMP, api.addTemp);
const loadTempSaga = createRequestSaga(LOAD_TEMP, api.getTemp);
const updateTempSaga = createRequestSaga(UPDATE_TEMP, api.updateTemp);
const removeTempSaga = createRequestSaga(REMOVE_TEMP, api.removeTemp);

export function* tempSaga() {
  yield takeLatest(ADD_TEMP, addTempSaga);
  yield takeLatest(LOAD_TEMP, loadTempSaga);
  yield takeLatest(UPDATE_TEMP, updateTempSaga);
  yield takeLatest(REMOVE_TEMP, removeTempSaga);
}

// reducer
const initialState = {
  addTemp: reducerUtils.initial(),
  loadTemp: reducerUtils.initial(),
  updateTemp: reducerUtils.initial(),
  removeTemp: reducerUtils.initial()
};

export default handleActions(
  {
    [INITIALIZE]: () => initialState,

    [ADD_TEMP]: state => ({
      ...state,
      addTemp: reducerUtils.loading(state.addTemp.data)
    }),
    [ADD_TEMP_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      addTemp: reducerUtils.success(response)
    }),
    [ADD_TEMP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      addTemp: reducerUtils.error(error)
    }),

    [LOAD_TEMP]: state => ({
      ...state,
      loadTemp: reducerUtils.loading(state.loadTemp.data)
    }),
    [LOAD_TEMP_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      loadTemp: reducerUtils.success(response)
    }),
    [LOAD_TEMP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadTemp: reducerUtils.error(error)
    }),

    [UPDATE_TEMP]: state => ({
      ...state,
      updateTemp: reducerUtils.loading(state.updateTemp.data)
    }),
    [UPDATE_TEMP_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      updateTemp: reducerUtils.success(response)
    }),
    [UPDATE_TEMP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      updateTemp: reducerUtils.error(error)
    }),

    [REMOVE_TEMP]: state => ({
      ...state,
      removeTemp: reducerUtils.loading(state.removeTemp.data)
    }),
    [REMOVE_TEMP_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      removeTemp: reducerUtils.success(response)
    }),
    [REMOVE_TEMP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      removeTemp: reducerUtils.error(error)
    })
  },
  initialState
);
