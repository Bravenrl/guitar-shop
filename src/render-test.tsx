import { render } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from './const';

export const customRender = (element: JSX.Element) =>
  render(
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={element} />
      </Routes>
    </BrowserRouter>);
