import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import HeaderContainer from './containers/Header/HeaderContainer';
import BoardContainer from './containers/Board/BoardContainer';
import PostContainer from './containers/Post/PostContainer';
import PostMakerContainer from './containers/PostMaker/PostMakerContainer';
import ProfilePageContainer from './containers/ProfilePage/ProfilePageContainer';
import SignupPageContainer from './containers/SignupPage/SignupPageContainer';
import PostWritePage from './pages/PostWritePage';
import PostUpdatePage from './pages/PostUpdatePage';
import ReplyUpdatePage from './pages/ReplyUpdatePage';

const BodyContainer = styled.div`
  padding-top: 96px;
`;

const Routes = () => (
  <>
    <HeaderContainer />
    <BodyContainer>
      <Route exact path="/profile" component={ProfilePageContainer} />
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
      <Route
        exact
        path="/board/:boardNameEng/:postId"
        component={PostContainer}
      />
      <Route path="/board/:boardNameEng" component={BoardContainer} />
      <Route path="/">
        <Redirect to="/board/freeboard" />
      </Route>
    </BodyContainer>
    <PostMakerContainer />
  </>
);

export default Routes;
