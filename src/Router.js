import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import HeaderContainer from './containers/Header/HeaderContainer';
import ProfilePage from './pages/ProfilePage';
import SignupPageContainer from './containers/SignupPage/SignupPageContainer';
import SignoutContainer from './containers/Signout/SignoutContainer';
import SigninContainer from './containers/Signin/SigninContainer';
import ReplyUpdatePage from './pages/ReplyUpdatePage';
import PostWritePage from './pages/PostWritePage';
import PostUpdatePage from './pages/PostUpdatePage';
import PostPage from './pages/PostPage';
import BoardPage from './pages/BoardPage';
import FeedbackContainer from './containers/Feedback/FeedbackContainer';

const Routes = () => (
  <>
    <HeaderContainer />
    <Switch>
      <Route exact path="/profile/:userId" component={ProfilePage} />
      <Route exact path="/signup" component={SignupPageContainer} />
      <Route exact path="/signout" component={SignoutContainer} />
      <Route exact path="/signin" component={SigninContainer} />
      <Route
        exact
        path="/board/:boardNameEng/write"
        component={PostWritePage}
      />
      <Route
        exact
        path="/board/:boardNameEng/:postId/write"
        component={PostUpdatePage}
      />
      <Route
        exact
        path="/board/:boardNameEng/:postId/update/:replyId"
        component={ReplyUpdatePage}
      />
      <Route exact path="/board/:boardNameEng/:postId" component={PostPage} />
      <Route exact path="/board/:boardNameEng" component={BoardPage} />
      <Route path="/">
        <Redirect to="/board/freeboard" />
      </Route>
    </Switch>
    <FeedbackContainer />
  </>
);

export default Routes;
