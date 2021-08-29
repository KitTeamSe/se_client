import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import HeaderContainer from './containers/Header/HeaderContainer';
import BoardContainer from './containers/Board/BoardContainer';
import PostMakerContainer from './containers/PostMaker/PostMakerContainer';
import PostContainer from './containers/Post/PostContainer';
import ProfilePageContainer from './containers/ProfilePage/ProfilePageContainer';
import SignupPageContainer from './containers/SignupPage/SignupPageContainer';

const BodyContainer = styled.div`
  padding-top: 96px;
`;

const Routes = () => (
  <>
    <HeaderContainer />
    <BodyContainer>
      <Switch>
        <Route path="/profile" component={ProfilePageContainer} />
        <Route path="/signup" component={SignupPageContainer} />
        <Route path="/board/:boardId" component={BoardContainer} />
        <Route path="/post/:boardId/:postId" component={PostContainer} />
        <Route path="/">
          <Redirect to="/board/1?page=1" />
        </Route>
      </Switch>
    </BodyContainer>
    <PostMakerContainer />
  </>
);

export default Routes;
