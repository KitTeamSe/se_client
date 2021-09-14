import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Nickname from '../../components/Post/Nickname';

const NicknameContainer = props => {
  const { nickname, accountIdString } = props;
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const menuHandle = e => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      const target = e.currentTarget;
      setAnchorEl(target);
    }
  };

  const GoUserProfile = () => {
    setAnchorEl(null);
    history.push(`/profile/${accountIdString}`);
  };
  return (
    <Nickname
      nickname={nickname}
      accountIdString={accountIdString}
      anchorEl={anchorEl}
      menuHandle={menuHandle}
      GoUserProfile={GoUserProfile}
    />
  );
};

export default NicknameContainer;
