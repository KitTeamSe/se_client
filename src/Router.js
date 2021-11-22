import React from 'react';
import styled from 'styled-components';
import { Route, Redirect, Switch } from 'react-router-dom';
import HeaderContainer from './containers/Header/HeaderContainer';
import FooterContainer from './containers/Footer/FooterContainer';
import ProfilePage from './pages/ProfilePage';
import ForgotPage from './pages/ForgotPage';
import SignupPage from './pages/SignupPage';
import SignoutContainer from './containers/Signout/SignoutContainer';
import SigninContainer from './containers/Signin/SigninContainer';
import ReplyUpdatePage from './pages/ReplyUpdatePage';
import PostWritePage from './pages/PostWritePage';
import PostUpdatePage from './pages/PostUpdatePage';
import PostPage from './pages/PostPage';
import BoardPage from './pages/BoardPage';
import FeedbackContainer from './containers/Feedback/FeedbackContainer';
import ThemeBoard from './components/Common/ThemeBoard';

const ContentWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(90deg, #fff 19px, transparent 1%) center,
    linear-gradient(#fff 19px, transparent 1%) center, #e0e0e0;
  background-size: 22px 22px;
`;

const BlankBox = styled.div`
  height: 96px;

  @media ${({ theme }) => theme.sizeQuery.mobile} {
    height: 60px;
  }
`;

const Routes = () => (
  <ContentWrapper>
    <HeaderContainer />
    <BlankBox />
    <Switch>
      <Route exact path="/profile/:userId" component={ProfilePage} />
      <Route exact path="/signup" component={SignupPage} />
      <Route exact path="/forgot" component={ForgotPage} />
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
      <Route exact path="/test/theme" component={ThemeBoard} />
      <Route path="/">
        <Redirect to="/board/freeboard" />
      </Route>
    </Switch>
    <FooterContainer />
    <FeedbackContainer />
  </ContentWrapper>
);

export default Routes;
