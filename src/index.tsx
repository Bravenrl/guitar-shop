import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import browserHistory from './browser-history';
import App from './components/app/app';
import { store } from './store/store';
import { HistoryRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TOAST_LIMIT } from './const';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
        <ToastContainer limit={TOAST_LIMIT} />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
