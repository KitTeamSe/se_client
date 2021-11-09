import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';
import * as api from '../../libs/api/account';
import {
  createRequestActionTypes,
  createRequestSaga
} from '../../libs/createRequestSaga';
import reducerUtils from '../../libs/reducerUtils';

// Actions
const INITIALIZE_FORM = 'account/INITIALIZE_FORM';
const CHANGE_FIELD = 'account/CHANGE_FIELD';
const [MY_INFO, MY_INFO_SUCCESS, MY_INFO_FAILURE] =
  createRequestActionTypes('account/MY_INFO');
const [MY_INFO_EDIT, MY_INFO_EDIT_SUCCESS, MY_INFO_EDIT_FAILURE] =
  createRequestActionTypes('account/MY_INFO_EDIT');
const [ACCOUNT_DELETE, ACCOUNT_DELETE_SUCCESS, ACCOUNT_DELETE_FAILURE] =
  createRequestActionTypes('account/ACCOUNT_DELETE');
// Action Creators
export const initializeForm = createAction(INITIALIZE_FORM, form => form);
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value
  })
);
export const myInfo = createAction(MY_INFO, ({ id }) => ({
  id
}));
export const myInfoEdit = createAction(
  MY_INFO_EDIT,
  ({ parameter, token }) => ({
    parameter,
    token
  })
);
export const accountDelete = createAction(
  ACCOUNT_DELETE,
  ({ userId, token }) => ({
    userId,
    token
  })
);

// Sagas
const myInfoSaga = createRequestSaga(MY_INFO, api.myInfo);
const myInfoEditSaga = createRequestSaga(MY_INFO_EDIT, api.myInfoEdit);
const accountDeleteSaga = createRequestSaga(ACCOUNT_DELETE, api.accountDelete);

export function* accountSaga() {
  yield takeLatest(MY_INFO, myInfoSaga);
  yield takeLatest(MY_INFO_EDIT, myInfoEditSaga);
  yield takeLatest(ACCOUNT_DELETE, accountDeleteSaga);
}

// reducer
const initialState = {
  newPwForm: {
    nowPassword: '',
    newPassword: '',
    newPasswordConfirm: ''
  },
  withDrawalForm: {
    password: '',
    text: ''
  },
  myInfo: reducerUtils.initial(),
  myInfoEditRes: reducerUtils.initial(),
  accountDeleteRes: reducerUtils.initial()
};

export default handleActions(
  {
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form]
    }),
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value;
      }),
    [MY_INFO]: state => ({
      ...state,
      myInfo: reducerUtils.loading(state.myInfo.data)
    }),
    [MY_INFO_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      myInfo: reducerUtils.success(response)
    }),
    [MY_INFO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      myInfo: reducerUtils.error(error)
    }),
    [MY_INFO_EDIT]: state => ({
      ...state,
      myInfoEditRes: reducerUtils.loading(state.myInfoEditRes.data)
    }),
    [MY_INFO_EDIT_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      myInfoEditRes: reducerUtils.success(response)
    }),
    [MY_INFO_EDIT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      myInfoEditRes: reducerUtils.error(error)
    }),
    [ACCOUNT_DELETE]: state => ({
      ...state,
      accountDeleteRes: reducerUtils.loading(state.accountDeleteRes.data)
    }),
    [ACCOUNT_DELETE_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      accountDeleteRes: reducerUtils.success(response)
    }),
    [ACCOUNT_DELETE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      accountDeleteRes: reducerUtils.error(error)
    })
  },
  initialState
);
