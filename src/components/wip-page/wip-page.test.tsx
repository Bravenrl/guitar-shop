import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { HistoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { ROOT, TestReg } from '../../const-test';
import { customRender } from '../../render-test';
import WipPage from './wip-page';

const history = createMemoryHistory();

describe('Component: WipPage', () => {
  it('should render correctly', () => {
    customRender(<WipPage />);

    expect(screen.getByText(TestReg.WipPage)).toBeInTheDocument();
    expect(screen.getByText(TestReg.BackToRoot)).toBeInTheDocument();
  });

  it('should redirect to /catalog/page_1 when user clicked on link', () => {
    history.push(`/${AppRoute.NotFoundPage}`);
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path={AppRoute.NotFound} element={<WipPage />} />
          <Route path={AppRoute.Main} element={<h1>{ROOT}</h1>} />
        </Routes>
      </HistoryRouter>);
    expect(screen.queryByText(TestReg.Root)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(TestReg.BackToRoot));
    expect(screen.getByText(TestReg.Root)).toBeInTheDocument();
  });
});
