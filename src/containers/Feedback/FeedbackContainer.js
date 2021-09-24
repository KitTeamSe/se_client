import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialize } from '../../modules/feedback';
import Feedback from '../../components/Feedback/Feedback';

const FeedbackContainer = () => {
  const dispatch = useDispatch();
  const { normal, success, alert, error } = useSelector(({ feedback }) => ({
    normal: feedback.normal,
    success: feedback.success,
    alert: feedback.alert,
    error: feedback.error
  }));

  const handleClose = () => {
    dispatch(initialize());
  };

  useEffect(() => {
    dispatch(initialize());
  }, []);

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

export default FeedbackContainer;
