import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import account, { accountSaga } from './account';
import post, { postSaga } from './post';

const rootReducer = combineReducers({ auth, account, post });

export function* rootSaga() {
  yield all([authSaga(), accountSaga(), postSaga()]);
}

export default rootReducer;
