import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import Routes from './Router';
import FontStyle from './assets/fonts/fonts';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

const App = () => {
  const { themeMode } = useSelector(({ styles }) => ({
    themeMode: styles.themeMode
  }));

  return (
    <ThemeProvider theme={theme(themeMode)}>
      <FontStyle />
      <GlobalStyle />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
