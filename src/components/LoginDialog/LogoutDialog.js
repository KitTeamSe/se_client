import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

const LogoutDialog = props => {
  const { onLogout } = props;

  return (
    <span>
      <FontAwesomeIcon
        icon={faDoorOpen}
        size="3x"
        type="submit"
        onClick={onLogout}
        style={{ cursor: 'pointer' }}
      />
    </span>
  );
};

export default LogoutDialog;
