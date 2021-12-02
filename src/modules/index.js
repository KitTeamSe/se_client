import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import account, { accountSaga } from './account';
import accountForm from './account/form';
import attach, { attachSaga } from './attach';
import attachForm from './attach/form';
import auth, { authSaga } from './auth';
import authForm from './auth/form';
import board, { boardSaga } from './board';
import boardForm from './board/form';
import feedback from './feedback';
import menu, { menuSaga } from './menu';
import post, { postSaga } from './post';
import postForm from './post/form';
import reply, { replySaga } from './reply';
import replyForm from './reply/form';
import styles from './styles';
import tag, { tagSaga } from './tag';
import tagForm from './tag/form';
import report, { reportSaga } from './report';
import reportForm from './report/form';

const rootReducer = combineReducers({
  account,
  accountForm,
  attach,
  attachForm,
  auth,
  authForm,
  board,
  boardForm,
  feedback,
  menu,
  post,
  postForm,
  reply,
  replyForm,
  styles,
  tag,
  tagForm,
  report,
  reportForm
});

export function* rootSaga() {
  yield all([
    accountSaga(),
    attachSaga(),
    authSaga(),
    boardSaga(),
    menuSaga(),
    postSaga(),
    replySaga(),
    tagSaga(),
    reportSaga()
  ]);
}

export default rootReducer;
