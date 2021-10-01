import React from 'react';
import ReactDOM from 'react-dom';

import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';
import createSagaMiddleware from 'redux-saga';
import './styles/reset.css';
import App from './App';
import rootReducer, { rootSaga } from './modules';
import theme from './styles/theme';
import reportWebVitals from './reportWebVitals';

const sagaMiddleware = createSagaMiddleware();
// redux devtools extension
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// redux 스토어 생성
/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StyledEngineProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
