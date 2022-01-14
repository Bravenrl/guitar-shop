import { MockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from './const';

export const customRender = (element: JSX.Element) =>
  render(
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={element} />
      </Routes>
    </BrowserRouter>);

export const customRenderWithProvider = (
  element: JSX.Element,
  store: MockStore,
) =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={element} />
        </Routes>
      </BrowserRouter>
    </Provider>);
