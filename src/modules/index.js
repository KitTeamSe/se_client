import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import account, { accountSaga } from './account';
import reply, { replySaga } from './reply';

const rootReducer = combineReducers({ auth, account, reply });

export function* rootSaga() {
  yield all([authSaga(), accountSaga(), replySaga()]);
}

export default rootReducer;
