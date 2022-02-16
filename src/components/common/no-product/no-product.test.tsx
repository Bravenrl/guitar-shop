import { act, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HistoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { TestReg } from '../../../const-test';
import NoProduct from './no-product';

const history = createMemoryHistory();
const renderElement = () =>
  render(
    <HistoryRouter history={history}>
      <Routes>
        <Route path={AppRoute.Root} element={<NoProduct />} />
        <Route path={`/${AppRoute.Cart}`} element={<NoProduct />} />
      </Routes>
    </HistoryRouter>);

describe('Component: Preloader', () => {
  it('should render correctly', () => {
    history.push(`/${AppRoute.Root}`);
    renderElement();
    expect(screen.getByText(TestReg.NoProduct)).toBeInTheDocument();
    expect(screen.queryByText(TestReg.CartNoProduct)).not.toBeInTheDocument();
    act(() => {history.push(`/${AppRoute.Cart}`);});
    expect(screen.getByText(TestReg.CartNoProduct)).toBeInTheDocument();
    expect(screen.queryByText(TestReg.NoProduct)).not.toBeInTheDocument();
  });
});
