import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { Provider } from 'react-redux';
import { HistoryRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { Main, TestReg, WIP } from '../../../const-test';
import { MockDATA, MockUSER } from '../../../mock/mockStore';
import MainLayout from './main-layout';

const FIRST_ELEMENT = 0;
const ACTIVE_CLASS = 'link--current';
const mockStore = configureMockStore();
const history = createMemoryHistory();
const componentState = {
  DATA: MockDATA,
  USER: MockUSER,
};
const store = mockStore(componentState);
mockAllIsIntersecting(true);

const renderMainLayout = () => render(
  <Provider store = {store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path = {AppRoute.Root} element={<MainLayout/>}>
          <Route index element={<Navigate to={AppRoute.Main} replace />} />
          <Route path={AppRoute.Main} element={<h1>{Main}</h1>} />
          <Route path={AppRoute.About} element={<h1>{WIP}</h1>} />
          <Route path={AppRoute.Where} element={<h1>{WIP}</h1>} />
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>);

describe('Component: MainLayout', () => {
  it('should render correctly', () => {
    renderMainLayout();
    expect(screen.getByPlaceholderText(TestReg.SearchPlaceholder)).toBeInTheDocument();
    expect(screen.getAllByAltText(TestReg.Logo).length).toEqual(2);
    expect(screen.getByText(TestReg.About)).toBeInTheDocument();
    expect(screen.getAllByText(TestReg.Where).length).toEqual(2);
    expect(screen.getByText(TestReg.Catalog)).toBeInTheDocument();
    expect(screen.getByText(TestReg.FooterAbout)).toBeInTheDocument();
    expect(screen.getByText(TestReg.FooterService)).toBeInTheDocument();
    expect(screen.getByText(TestReg.Main)).toBeInTheDocument();
  });

  it('should redirect when user clicked on links', () => {
    history.push(`/${AppRoute.Root}`);
    renderMainLayout();
    expect(screen.getByText(TestReg.Main)).toBeInTheDocument();
    expect(screen.getByText(TestReg.Catalog)).toHaveClass(ACTIVE_CLASS);
    userEvent.click(screen.getAllByText(TestReg.About)[FIRST_ELEMENT]);
    expect(screen.queryByText(TestReg.Main)).not.toBeInTheDocument();
    expect(screen.getByText(TestReg.WipPage)).toBeInTheDocument();
    expect(screen.getByText(TestReg.About)).toHaveClass(ACTIVE_CLASS);
    expect(screen.getByText(TestReg.Catalog)).not.toHaveClass(ACTIVE_CLASS);
    userEvent.click(screen.getAllByText(TestReg.Where)[FIRST_ELEMENT]);
    expect(screen.getByText(TestReg.WipPage)).toBeInTheDocument();
    expect(screen.getAllByText(TestReg.Where)[FIRST_ELEMENT]).toHaveClass(ACTIVE_CLASS);
    expect(screen.getByText(TestReg.About)).not.toHaveClass(ACTIVE_CLASS);
    userEvent.click(screen.getByText(TestReg.Catalog));
    expect(screen.getByText(TestReg.Main)).toBeInTheDocument();
    expect(screen.getByText(TestReg.Catalog)).toHaveClass(ACTIVE_CLASS);
  });
});
