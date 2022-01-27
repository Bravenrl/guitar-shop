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
import ScrollToTop from './components/common/scroll-to-top/scroll-to-top';
import ModalContainer from './components/modals/modal-container/modal-container';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <HelmetProvider>
          <ScrollToTop/>
          <App />
          <ModalContainer />
        </HelmetProvider>
        <ToastContainer limit={TOAST_LIMIT} />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
