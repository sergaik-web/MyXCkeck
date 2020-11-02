import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import Store from './Store/Store';
import './index.scss';
import App from './Components/App/App';

ReactDOM.render(
  <Provider store={Store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root')
);
