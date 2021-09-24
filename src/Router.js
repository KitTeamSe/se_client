import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import styled from 'styled-components';
import HeaderContainer from './containers/Header/HeaderContainer';
import PostMakerContainer from './containers/PostMaker/PostMakerContainer';
import ProfilePageContainer from './containers/ProfilePage/ProfilePageContainer';
import SignupPageContainer from './containers/SignupPage/SignupPageContainer';
import PostWritePage from './pages/PostWritePage';
import PostUpdatePage from './pages/PostUpdatePage';
import ReplyUpdatePage from './pages/ReplyUpdatePage';
import BoardPage from './pages/BoardPage';
import PostPage from './pages/PostPage';
import FeedbackContainer from './containers/Feedback/FeedbackContainer';

const BodyContainer = styled.div`
  padding-top: 96px;
`;

const Routes = () => (
  <>
    <HeaderContainer />
    <BodyContainer>
      <Switch>
        <Route exact path="/profile/:userId" component={ProfilePageContainer} />
        <Route exact path="/signup" component={SignupPageContainer} />
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
    </BodyContainer>
    <FeedbackContainer />
    <PostMakerContainer />
  </>
);

export default Routes;
