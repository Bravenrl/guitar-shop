import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import { HistoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { ROOT, TestReg } from '../../../const-test';
import { customRender } from '../../../render-test';
import Breadcrumbs from './breadcrumbs';


const history = createMemoryHistory();

describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    customRender(<Breadcrumbs/>);
    expect(screen.getByText(TestReg.BreadcrumbsMain)).toBeInTheDocument();
    expect(screen.getByText(TestReg.BreadcrumbsCatalog)).toBeInTheDocument();
  });

  it('should redirect to /root when user clicked on link', () => {
    history.push(`/${AppRoute.Main}`);
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path={AppRoute.Main} element={<Breadcrumbs />} />
          <Route path={AppRoute.Root} element={<h1>{ROOT}</h1>} />
        </Routes>
      </HistoryRouter>);
    expect(screen.queryByText(TestReg.Root)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(TestReg.BreadcrumbsMain));
    expect(screen.getByText(TestReg.Root)).toBeInTheDocument();
    act(()=>{history.push(`/${AppRoute.Main}`);});
    expect(screen.queryByText(TestReg.Root)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(TestReg.BreadcrumbsCatalog));
    expect(screen.getByText(TestReg.Root)).toBeInTheDocument();
  });
});
