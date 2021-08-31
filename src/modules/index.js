import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import account, { accountSaga } from './account';
import reply, { replySaga } from './reply';
import post, { postSaga } from './post';

const rootReducer = combineReducers({ auth, account, post, reply });

export function* rootSaga() {
  yield all([authSaga(), accountSaga(), postSaga(), replySaga()]);
}

export default rootReducer;
