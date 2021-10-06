import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as api from '../../libs/api/menu';
import {
  createRequestActionTypes,
  createRequestSaga
} from '../../libs/createRequestSaga';
import reducerUtils from '../../libs/reducerUtils';

// Actions
const INITIALIZE = 'menu/INITIALIZE';
const [LOAD_MENU_LIST, LOAD_MENU_LIST_SUCCESS, LOAD_MENU_LIST_FAILURE] =
  createRequestActionTypes('menu/LOAD_MENU_LIST');

// Action Creators
export const initialize = createAction(INITIALIZE);
export const loadMenuList = createAction(LOAD_MENU_LIST);

// Sagas
const loadMenuListSage = createRequestSaga(LOAD_MENU_LIST, api.loadMenuList);

export function* menuSaga() {
  yield takeLatest(LOAD_MENU_LIST, loadMenuListSage);
}

// reducer
const initialState = {
  loadedMenuList: reducerUtils.initial()
};

export default handleActions(
  {
    [INITIALIZE]: () => initialState,
    [LOAD_MENU_LIST]: state => ({
      ...state,
      loadedMenuList: reducerUtils.loading(state.loadedMenuList.data)
    }),
    [LOAD_MENU_LIST_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      loadedMenuList: reducerUtils.success(response)
    }),
    [LOAD_MENU_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loadedMenuList: reducerUtils.error(error)
    })
  },
  initialState
);
