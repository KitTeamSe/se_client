import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import account, { accountSaga } from './account';
import find, { findSaga } from './find';
import reply, { replySaga } from './reply';
import post, { postSaga } from './post';
import board, { boardSaga } from './board';
import attach, { attachSaga } from './attach';
import tag, { tagSaga } from './tag';
import menu, { menuSaga } from './menu';
import report, { reportSaga } from './report';
import feedback from './feedback';
import styles from './styles';

const rootReducer = combineReducers({
  auth,
  account,
  find,
  post,
  board,
  reply,
  attach,
  tag,
  menu,
  feedback,
  report,
  styles
});

export function* rootSaga() {
  yield all([
    authSaga(),
    accountSaga(),
    findSaga(),
    postSaga(),
    boardSaga(),
    replySaga(),
    attachSaga(),
    tagSaga(),
    reportSaga(),
    menuSaga()
  ]);
}

export default rootReducer;
