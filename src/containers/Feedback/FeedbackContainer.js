import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import {
  alertFeedback,
  errorFeedback,
  initialize,
  successFeedback
} from '../../modules/feedback';
import Feedback from '../../components/Feedback/Feedback';

const data = {
  auth: {
    signoutSuccess: '로그아웃 성공',
    signinSuccess: '로그인 성공',
    signinError: '로그인 실패',
    signupSuccess: '회원가입 성공',
    signupError: '회원가입 실패'
  },
  reply: {
    add: '댓글 작성 완료',
    update: '댓글 수정 완료',
    delete: '댓글 삭제 완료',
    secret: '비밀 댓글 확인 성공'
  },
  post: {
    add: '게시글 작성 완료',
    update: '게시글 수정 완료',
    delete: '게시글 삭제 완료',
    secret: '비밀 게시글 조회 성공'
  }
};

const FeedbackContainer = props => {
  const { location } = props;
  const dispatch = useDispatch();
  const { normal, success, alert, error } = useSelector(({ feedback }) => ({
    normal: feedback.normal,
    success: feedback.success,
    alert: feedback.alert,
    error: feedback.error
  }));

  const { signinSuccess, signinError, signupSuccess, signupError } =
    useSelector(({ auth }) => ({
      signinSuccess: auth.auth.data,
      signinError: auth.auth.error,
      signupSuccess: auth.signupResponse.data,
      signupError: auth.signupResponse.error
    }));

  const { replyAdd, replyUpdate, replyDelete, replySecretCheck } = useSelector(
    ({ reply }) => ({
      replyAdd: reply.addReply.data,
      replyUpdate: reply.updateReply.data,
      replyDelete: reply.removeReply.data,
      replySecretCheck: reply.loadSecretReply.data
    })
  );

  const { postAdd, postUpdate, postDelete, postData } = useSelector(
    ({ post }) => ({
      postAdd: post.addPost.data,
      postUpdate: post.updatePost.data,
      postDelete: post.postDeleteRes.data,
      postData: post.loadedPost.data
    })
  );

  const handleClose = () => {
    dispatch(initialize());
  };

  const handleFeedback = (type, message) => {
    if (type === 'success') dispatch(successFeedback(message));
    if (type === 'alert') dispatch(alertFeedback(message));
    if (type === 'error') dispatch(errorFeedback(message));
  };

  useEffect(() => {
    dispatch(initialize());
  }, []);

  useEffect(() => {
    if (signinSuccess) handleFeedback('success', data.auth.signinSuccess);
    if (signinError) handleFeedback('error', data.auth.signinError);
    if (signupSuccess) handleFeedback('success', data.auth.signupSuccess);
    if (signupError) handleFeedback('error', data.auth.signupError);
  }, [signinSuccess, signinError, signupSuccess, signupError]);

  useEffect(() => {
    if (replyAdd) handleFeedback('success', data.reply.add);
    if (replyUpdate) handleFeedback('success', data.reply.update);
    if (replyDelete) handleFeedback('success', data.reply.delete);
    if (replySecretCheck) handleFeedback('success', data.reply.secret);
  }, [replyAdd, replyUpdate, replyDelete, replySecretCheck]);

  useEffect(() => {
    if (postAdd) handleFeedback('success', data.post.add);
    if (postUpdate) handleFeedback('success', data.post.update);
    if (postDelete) handleFeedback('success', data.post.delete);
    if (postData) {
      const { secret } = qs.parse(location.search, {
        ignoreQueryPrefix: true
      });
      if (secret === 'true') handleFeedback('success', data.post.secret);
    }
  }, [postAdd, postUpdate, postDelete, postData]);

  return (
    <Feedback
      normal={normal}
      success={success}
      alert={alert}
      error={error}
      handleClose={handleClose}
    />
  );
};

export default withRouter(FeedbackContainer);
