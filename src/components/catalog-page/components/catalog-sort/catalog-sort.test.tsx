import { configureMockStore } from '@jedmao/redux-mock-store';
import * as Redux from 'react-redux';
import { fetchSortedProducts } from '../../../../store/api-actions';
import CatalogSort from './catalog-sort';
import { MockDATA, MockUSER } from '../../../../mock/mockStore';
import { SortState } from '../../../../types/state';
import { AppRoute, OrderKey, SortKey } from '../../../../const';
import { TestReg } from '../../../../const-test';
import { customRenderWithProvider } from '../../../../render-test';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter, Route, Routes } from 'react-router-dom';

const SORT_ACTIVE = 'catalog-sort__type-button--active';
const ORDER_ACTIVE = 'catalog-sort__order-button--active';
const PAGE = 1;

jest.mock('../../../../store/api-actions');
const fakeFetchSortedProducts = fetchSortedProducts as jest.MockedFunction<typeof fetchSortedProducts>;
const mockStore = configureMockStore();
const history = createMemoryHistory();
const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const sort:SortState = {
  sortKey: SortKey.Price,
  orderKey: OrderKey.Asc,
};

const componentState = {
  DATA: MockDATA,
  USER: {...MockUSER, sort: sort},
};

describe('Component: CatalogSort', () => {
  it('should render correctly', () => {
    const store = mockStore(componentState);
    customRenderWithProvider(<CatalogSort/>, store);
    expect(screen.getByLabelText(TestReg.ByPrice)).toBeInTheDocument();
    expect(screen.getByLabelText(TestReg.ByPrice)).toHaveClass(SORT_ACTIVE);
    expect(screen.getByLabelText(TestReg.ByRating)).toBeInTheDocument();
    expect(screen.getByLabelText(TestReg.ByRating)).not.toHaveClass(SORT_ACTIVE);
    expect(screen.getByLabelText(TestReg.Ascending)).toBeInTheDocument();
    expect(screen.getByLabelText(TestReg.Ascending)).toHaveClass(ORDER_ACTIVE);
    expect(screen.getByLabelText(TestReg.Descending)).toBeInTheDocument();
    expect(screen.getByLabelText(TestReg.Descending)).not.toHaveClass(ORDER_ACTIVE);
  });

  it('should dispatch actions correctly', () => {
    history.push(`/catalog/page_${PAGE}`);
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
            />
            <Route
              path={`/${AppRoute.Catalog}`}
              element={<CatalogSort />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>);

    userEvent.click(screen.getByLabelText(TestReg.ByPrice));
    expect(fakeFetchSortedProducts).toHaveBeenCalledWith(PAGE, {...sort, sortKey: SortKey.Price});
    userEvent.click(screen.getByLabelText(TestReg.ByRating));
    expect(fakeFetchSortedProducts).toHaveBeenCalledWith(PAGE, {...sort, sortKey: SortKey.Rating});
    userEvent.click(screen.getByLabelText(TestReg.Ascending));
    expect(fakeFetchSortedProducts).toHaveBeenCalledWith(PAGE, {...sort, orderKey: OrderKey.Asc});
    userEvent.click(screen.getByLabelText(TestReg.Descending));
    expect(fakeFetchSortedProducts).toHaveBeenCalledWith(PAGE, {...sort, orderKey: OrderKey.Desc});
  });
});


