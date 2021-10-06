import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import account, { accountSaga } from './account';
import reply, { replySaga } from './reply';
import post, { postSaga } from './post';
import board, { boardSaga } from './board';
import attach, { attachSaga } from './attach';
import tag, { tagSaga } from './tag';
import menu, { menuSaga } from './menu';
import feedback from './feedback';

const rootReducer = combineReducers({
  auth,
  account,
  post,
  board,
  reply,
  attach,
  tag,
  menu,
  feedback
});

export function* rootSaga() {
  yield all([
    authSaga(),
    accountSaga(),
    postSaga(),
    boardSaga(),
    replySaga(),
    attachSaga(),
    tagSaga(),
    menuSaga()
  ]);
}

export default rootReducer;
