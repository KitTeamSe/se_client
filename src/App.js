import React from 'react';
import Routes from './Router';
import FontStyle from './assets/fonts/fonts';
import GlobalStyle from './styles/GlobalStyle';

const App = () => {
  return (
    <>
      <FontStyle />
      <GlobalStyle />
      <Routes />
    </>
  );
};

export default App;
