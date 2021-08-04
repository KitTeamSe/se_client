import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import account, { accountSaga } from './account';

const rootReducer = combineReducers({ auth, account });

export function* rootSaga() {
  yield all([authSaga(), accountSaga()]);
}

export default rootReducer;
