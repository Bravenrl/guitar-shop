import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { HistoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { ROOT, TestReg } from '../../const-test';
import { customRender } from '../../render-test';
import NotFoundPage from './not-found-page';

const history = createMemoryHistory();

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    customRender(<NotFoundPage/>);
    expect(screen.getByText(TestReg.NotFoundPage)).toBeInTheDocument();
    expect(screen.getByText(TestReg.BackToRoot)).toBeInTheDocument();
  });

  it('should redirect to /catalog/page_1 when user clicked on link', () => {
    history.push(`/${AppRoute.NotFoundPage}`);
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
          <Route path={AppRoute.Main} element={<h1>{ROOT}</h1>} />
        </Routes>
      </HistoryRouter>);
    expect(screen.queryByText(TestReg.Root)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(TestReg.BackToRoot));
    expect(screen.getByText(TestReg.Root)).toBeInTheDocument();
  });
});
