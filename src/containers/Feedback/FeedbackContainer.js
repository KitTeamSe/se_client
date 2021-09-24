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
    signinSuccess: '로그인 성공',
    signinError: '로그인 실패',
    signupSuccess: '회원가입 성공',
    signupError: '회원가입 실패'
  },
  account: {
    editinfoSuccess: '회원정보 수정 성공',
    editinfoError: '회원정보 수정 실패',
    accountDeleteSuccess: '회원탈퇴 성공',
    accountDeleteError: '회원탈퇴 실패'
  },
  reply: {
    addSuccess: '댓글 작성 완료',
    addError: '댓글 작성 실패',
    updateSuccess: '댓글 수정 완료',
    updateError: '댓글 수정 실패',
    deleteSuccess: '댓글 삭제 완료',
    deleteError: '댓글 삭제 실패',
    secretSuccess: '비밀 댓글 확인 성공',
    secretError: '비밀 댓글 확인실패공'
  },
  post: {
    addSuccess: '게시글 작성 완료',
    addError: '게시글 작성 실패',
    updateSuccess: '게시글 수정 완료',
    updateError: '게시글 수정 실패',
    deleteSuccess: '게시글 삭제 완료',
    deleteError: '게시글 삭제 실패',
    secretSuccess: '비밀 게시글 조회 성공',
    secretError: '비밀 게시글 조회실패공'
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

  const {
    editInfoSuccess,
    editInfoError,
    accountDeleteSuccess,
    accountDeleteError
  } = useSelector(({ account }) => ({
    editInfoSuccess: account.myinfoEditRes.data,
    editInfoError: account.myinfoEditRes.error,
    accountDeleteSuccess: account.accountDeleteRes.data,
    accountDeleteError: account.accountDeleteRes.error
  }));

  const {
    replyAddSuccess,
    replyAddError,
    replyUpdateSuccess,
    replyUpdateError,
    replyDeleteSuccess,
    replyDeleteError,
    replySecretCheckSuccess,
    replySecretCheckError
  } = useSelector(({ reply }) => ({
    replyAddSuccess: reply.addReply.data,
    replyAddError: reply.addReply.error,
    replyUpdateSuccess: reply.updateReply.data,
    replyUpdateError: reply.updateReply.error,
    replyDeleteSuccess: reply.removeReply.data,
    replyDeleteError: reply.removeReply.error,
    replySecretCheckSuccess: reply.loadSecretReply.data,
    replySecretCheckError: reply.loadSecretReply.errora
  }));

  const {
    postAddSuccess,
    postAddError,
    postUpdateSuccess,
    postUpdateError,
    postDeleteSuccess,
    postDeleteError,
    postDataSuccess,
    postDataError
  } = useSelector(({ post }) => ({
    postAddSuccess: post.addPost.data,
    postAddError: post.addPost.error,
    postUpdateSuccess: post.updatePost.data,
    postUpdateError: post.updatePost.error,
    postDeleteSuccess: post.postDeleteRes.data,
    postDeleteError: post.postDeleteRes.error,
    postDataSuccess: post.loadedPost.data,
    postDataError: post.loadedPost.errora
  }));

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
    if (signupSuccess) handleFeedback('success', data.auth.signupSuccess);

    if (signinError)
      handleFeedback('error', signinError.message || data.auth.signinError);
    if (signupError)
      handleFeedback('error', signupError.message || data.auth.signupError);
  }, [signinSuccess, signupSuccess, signinError, signupError]);

  useEffect(() => {
    if (editInfoSuccess)
      handleFeedback('success', data.account.editinfoSuccess);
    if (editInfoError)
      handleFeedback(
        'error',
        editInfoError.message || data.account.editinfoError
      );
    if (accountDeleteSuccess)
      handleFeedback('success', data.account.accountDeleteSuccess);
    if (accountDeleteError)
      handleFeedback('error', data.account.accountDeleteError);
  }, [
    editInfoSuccess,
    editInfoError,
    accountDeleteSuccess,
    accountDeleteError
  ]);

  useEffect(() => {
    if (replyAddSuccess) handleFeedback('success', data.reply.addSuccess);
    if (replyUpdateSuccess) handleFeedback('success', data.reply.updateSuccess);
    if (replyDeleteSuccess) handleFeedback('success', data.reply.deleteSuccess);
    if (replySecretCheckSuccess)
      handleFeedback('success', data.reply.secretSuccess);

    if (replyAddError)
      handleFeedback('error', replyAddError.message || data.reply.addError);
    if (replyUpdateError)
      handleFeedback(
        'error',
        replyUpdateError.message || data.reply.updateError
      );
    if (replyDeleteError)
      handleFeedback(
        'error',
        replyDeleteError.message || data.reply.deleteError
      );
    if (replySecretCheckError)
      handleFeedback(
        'error',
        replySecretCheckError.message || data.reply.secretError
      );
  }, [
    replyAddSuccess,
    replyUpdateSuccess,
    replyDeleteSuccess,
    replySecretCheckSuccess,
    replyAddError,
    replyUpdateError,
    replyDeleteError,
    replySecretCheckError
  ]);

  useEffect(() => {
    if (postAddSuccess) handleFeedback('success', data.post.addSuccess);
    if (postUpdateSuccess) handleFeedback('success', data.post.updateSuccess);
    if (postDeleteSuccess) handleFeedback('success', data.post.deleteSuccess);
    if (postDataSuccess) {
      const { secret } = qs.parse(location.search, {
        ignoreQueryPrefix: true
      });
      if (secret === 'true') handleFeedback('success', data.post.secretSuccess);
    }

    if (postAddError)
      handleFeedback('error', postAddError.message || data.post.addError);
    if (postUpdateError)
      handleFeedback('error', postUpdateError.message || data.post.updateError);
    if (postDeleteError)
      handleFeedback('error', postDeleteError.message || data.post.deleteError);
    if (postDataError) {
      const { secret } = qs.parse(location.search, {
        ignoreQueryPrefix: true
      });
      if (secret === 'true')
        handleFeedback('error', postDataError.message || data.post.secretError);
    }
  }, [
    postAddSuccess,
    postUpdateSuccess,
    postDeleteSuccess,
    postDataSuccess,
    postAddError,
    postUpdateError,
    postDeleteError,
    postDataError
  ]);

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
