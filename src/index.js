import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

ReactDOM.render(
  <BrowserRouter basename='/need-for-drive/' history={history}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
