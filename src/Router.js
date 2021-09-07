import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import HeaderContainer from './containers/Header/HeaderContainer';
import BoardContainer from './containers/Board/BoardContainer';
import PostMakerContainer from './containers/PostMaker/PostMakerContainer';
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
        <Route exact path="/profile" component={ProfilePageContainer} />
        <Route exact path="/signup" component={SignupPageContainer} />
        <Route path="/board/:boardNameEng" component={BoardContainer} />
        <Route path="/">
          <Redirect to="/board/freeboard" />
        </Route>
      </Switch>
    </BodyContainer>
    <PostMakerContainer />
  </>
);

export default Routes;
