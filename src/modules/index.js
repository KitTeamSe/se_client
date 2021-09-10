import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import account, { accountSaga } from './account';
import reply, { replySaga } from './reply';
import post, { postSaga } from './post';
import attach, { attachSaga } from './attach';

const rootReducer = combineReducers({ auth, account, post, reply, attach });

export function* rootSaga() {
  yield all([authSaga(), accountSaga(), postSaga(), replySaga(), attachSaga()]);
}

export default rootReducer;
