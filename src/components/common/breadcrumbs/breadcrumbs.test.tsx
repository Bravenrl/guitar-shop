import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { generatePath, HistoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, Title } from '../../../const';
import { ROOT, TestReg } from '../../../const-test';
import { fakeProduct } from '../../../mock/fakeData';
import { MockDATA, MockUSER } from '../../../mock/mockStore';
import Breadcrumbs from './breadcrumbs';

const history = createMemoryHistory();

const NAME = 'Product';
const ID = 1;
const productPath = generatePath(AppRoute.Product, { id: ID.toString() });
const fakeCurrentProduct = { ...fakeProduct, name: NAME, id: ID };
const componentState = {
  DATA: { ...MockDATA, currentProduct: fakeCurrentProduct },
  USER: MockUSER,
};

const mockStore = configureMockStore();
const store = mockStore(componentState);

const renderBreadcrumbs = () =>
  render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Breadcrumbs />
      </HistoryRouter>
    </Provider>);

describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    act(() => {
      history.push(AppRoute.Root);
    });
    renderBreadcrumbs();
    expect(screen.getByText(TestReg.BreadcrumbsMain)).toBeInTheDocument();
    expect(screen.getByText(TestReg.BreadcrumbsCatalog)).toBeInTheDocument();
    act(() => {
      history.push(`/${productPath}`);
    });
    expect(screen.getByText(TestReg.BreadcrumbsCatalog)).toBeInTheDocument();
    expect(screen.getByText(NAME)).toBeInTheDocument();
    act(() => {
      history.push(`/${AppRoute.Cart}`);
    });
    expect(screen.getByText(TestReg.BreadcrumbsCatalog)).toBeInTheDocument();
    expect(screen.queryByText(NAME)).not.toBeInTheDocument();
    expect(screen.getByText(Title.Cart)).toBeInTheDocument();
    act(() => {
      history.push(AppRoute.Root);
    });
    expect(screen.getByText(TestReg.BreadcrumbsCatalog)).toBeInTheDocument();
    expect(screen.queryByText(NAME)).not.toBeInTheDocument();
    expect(screen.queryByText(Title.Cart)).not.toBeInTheDocument();
  });

  it('should redirect to /root when user clicked on link', () => {
    act(() => {
      history.push(`/${AppRoute.Main}`);
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Main} element={<Breadcrumbs />} />
            <Route path={AppRoute.Root} element={<h1>{ROOT}</h1>} />
          </Routes>
        </HistoryRouter>
      </Provider>);
    expect(screen.queryByText(TestReg.Root)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(TestReg.BreadcrumbsMain));
    expect(screen.getByText(TestReg.Root)).toBeInTheDocument();
    act(() => {
      history.push(`/${AppRoute.Main}`);
    });
    expect(screen.queryByText(TestReg.Root)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(TestReg.BreadcrumbsCatalog));
    expect(screen.getByText(TestReg.Root)).toBeInTheDocument();
  });
});
