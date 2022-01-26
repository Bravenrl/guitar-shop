import { cleanup, render, screen } from '@testing-library/react';
import CatalogPage from './catalog-page';
import { TestID, TestReg } from '../../const-test';
import { fakeGuitars, fakeProducts } from '../../mock/fakeData';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { MockDATA, MockUSER } from '../../mock/mockStore';
import * as Redux from 'react-redux';
import { AppRoute, PAGE_COUNT, Title } from '../../const';
import { createMemoryHistory } from 'history';
import { HistoryRouter, Navigate, Route, Routes } from 'react-router-dom';
import {
  fetchFilteredProducts,
  fetchProductsPrice
} from '../../store/api-actions';
import { resetFilter, resetSort } from '../../store/app-user/slice-app-user';
import { HelmetProvider } from 'react-helmet-async';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

HelmetProvider.canUseDOM = false;

jest.mock('../../store/app-user/slice-app-user');
jest.mock('../../store/api-actions');
mockAllIsIntersecting(true);

const PRODUCTS = 50;
const PAGE = 1;
const PATH = '/catalog/page_1?stringCount=6&type=electric';
const IS_FAKE_QUERY = true;

const ExpectObject = {
  priceMax: '',
  priceMin: '',
  productTypes: ['electric'],
  stringCounts: ['6'],
};

const fakeFetchProductsPrice = fetchProductsPrice as jest.MockedFunction<
  typeof fetchProductsPrice
>;
const fakeFetchFilteredProducts = fetchFilteredProducts as jest.MockedFunction<
  typeof fetchFilteredProducts
>;
const fakeResetFilter = resetFilter as jest.MockedFunction<typeof resetFilter>;
const fakeResetSort = resetSort as jest.MockedFunction<typeof resetSort>;

const mockStore = configureMockStore();
const componentState = {
  DATA: {
    ...MockDATA,
    productsShow: fakeProducts,
    productsCount: PRODUCTS,
    isLoading: false,
  },
  USER: MockUSER,
};
const history = createMemoryHistory();
const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const renderCatalogPage = (store: MockStore) =>
  render(
    <Redux.Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<Navigate to={AppRoute.Main} />}
            />
            <Route path={AppRoute.Catalog} element={<CatalogPage />} />
          </Routes>
        </HelmetProvider>
      </HistoryRouter>
    </Redux.Provider>);

describe('Component: CatalogPage', () => {
  afterEach(cleanup);
  it('should render correctly', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    renderCatalogPage(store);
    expect(screen.getByText(Title.Catalog)).toBeInTheDocument();
    expect(screen.getByText(TestReg.FilterTitle)).toBeInTheDocument();
    expect(screen.getByText(TestReg.PriceTitle)).toBeInTheDocument();
    expect(screen.getByLabelText(TestReg.ByPrice)).toBeInTheDocument();
    expect(screen.queryAllByTestId(TestID.Pagination).length).toEqual(
      PAGE_COUNT);
    expect(screen.queryAllByText(TestReg.AboutProduct).length).toEqual(
      fakeGuitars.length);
  });
  it('should dispatch async actions when mount and reset actions when unmount', async () => {
    history.push(PATH);
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    const { unmount } = renderCatalogPage(store);
    expect(fakeFetchFilteredProducts).toHaveBeenCalledWith(
      ExpectObject,
      PAGE,
      IS_FAKE_QUERY);
    expect(fakeFetchProductsPrice).toHaveBeenCalled();
    unmount();
    expect(fakeResetFilter).toBeCalled();
    expect(fakeResetSort).toBeCalled();
  });
});
