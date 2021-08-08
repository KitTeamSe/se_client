import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header/Header';

const HeaderContainer = () => {
  const history = useHistory();

  const LogoClick = () => {
    history.push('/');
  };
  return <Header LogoClick={LogoClick} />;
};

export default HeaderContainer;
