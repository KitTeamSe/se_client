import React from 'react';
import { Snackbar, Alert as MuiAlert } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SuccessFeedback = props => {
  const { open, handleClose, autoHideDuration, message } = props;

  const successProps = {
    open,
    handleClose,
    autoHideDuration,
    severity: 'success',
    message
  };

  return <Feedback {...successProps} />;
};

const WarningFeedback = props => {
  const { open, handleClose, autoHideDuration, message } = props;

  const warningProps = {
    open,
    handleClose,
    autoHideDuration,
    severity: 'warning',
    message
  };

  return <Feedback {...warningProps} />;
};

const ErrorFeedback = props => {
  const { open, handleClose, autoHideDuration, message } = props;

  const errorProps = {
    open,
    handleClose,
    autoHideDuration,
    severity: 'error',
    message
  };

  return <Feedback {...errorProps} />;
};

const Feedback = props => {
  const {
    open,
    handleClose,
    severity,
    message,
    autoHideDuration = 3000,
    anchorOrigin = { vertical: 'bottom', horizontal: 'right' }
  } = props;

  return (
    <Snackbar
      open={!!open} // open 은 boolean 값이어야 함
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
      autoHideDuration={autoHideDuration}
    >
      <Alert
        elevation={1}
        variant="filled"
        onClose={handleClose}
        severity={severity}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default props => {
  const { normal, success, alert, error, handleClose } = props;
  return (
    <>
      <Feedback open={normal} message={normal} handleClose={handleClose} />
      <SuccessFeedback
        open={success}
        message={success}
        handleClose={handleClose}
      />
      <WarningFeedback open={alert} message={alert} handleClose={handleClose} />
      <ErrorFeedback open={error} message={error} handleClose={handleClose} />
    </>
  );
};
