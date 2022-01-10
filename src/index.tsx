import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import browserHistory from './browser-history';
import App from './components/app/app';
import { store } from './store/store';
import {HistoryRouter} from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history ={browserHistory}>
        <App />
      </HistoryRouter >
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
