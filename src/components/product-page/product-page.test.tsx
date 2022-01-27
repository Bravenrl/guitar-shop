import { render, screen } from '@testing-library/react';
import ProductPage from './product-page';
import { HelmetProvider } from 'react-helmet-async';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { MockAPP, MockDATA, MockUSER } from '../../mock/mockStore';
import { fakeComments, fakeProduct } from '../../mock/fakeData';
import { fetchCurrentProduct } from '../../store/api-actions';
import * as Redux from 'react-redux';
import {
  clearCurrentComments,
  clearCurrentProduct,
} from '../../store/app-data/slice-app-data';
import { createMemoryHistory } from 'history';
import { HistoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, INIT_COMMENTS_COUNT } from '../../const';
import { TestReg } from '../../const-test';

HelmetProvider.canUseDOM = false;
jest.mock('../../store/api-actions');
jest.mock('../../store/app-data/slice-app-data');
const fakeFetchCurrentProduct = fetchCurrentProduct as jest.MockedFunction<
  typeof fetchCurrentProduct
>;

const fakeClearCurrentProduct = clearCurrentProduct as jest.MockedFunction<
  typeof clearCurrentProduct
>;
const fakeClearCurrentComments = clearCurrentComments as jest.MockedFunction<
  typeof clearCurrentComments
>;

const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const mockStore = configureMockStore();
const NAME = 'Product';
const ID = 1;
const fakeCurrentProduct = { ...fakeProduct, name: NAME, id: ID };
const componentState = {
  DATA: {
    ...MockDATA,
    currentProduct: fakeCurrentProduct,
    currentComments: fakeComments,
  },
  USER: MockUSER,
  APP: MockAPP,
};
const store = mockStore(componentState);
const history = createMemoryHistory();
window.scrollTo = jest.fn();

const renderProductPage = () =>
  render(
    <Redux.Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <Routes>
            <Route path={AppRoute.Root} />
            <Route path={AppRoute.Product} element={<ProductPage />} />
          </Routes>
        </HelmetProvider>
      </HistoryRouter>
    </Redux.Provider>);

describe('Component: ProductPage', () => {
  it('should render correctly', () => {
    useDispatch.mockReturnValue(dispatch);
    history.push('/product/1');
    renderProductPage();
    expect(screen.getAllByText(NAME).length).toEqual(3);
    expect(screen.getAllByText(TestReg.Comment).length).toEqual(INIT_COMMENTS_COUNT);
    expect(screen.getByText(TestReg.Description)).toBeInTheDocument();
    expect(screen.getByText(TestReg.Price)).toBeInTheDocument();
    expect(screen.getByText(TestReg.ScrollBtn)).toBeInTheDocument();
  });
  it('should dispatch async actions when mount and clear actions when unmount', async () => {
    history.push('/product/1');
    useDispatch.mockReturnValue(dispatch);
    const { unmount } = renderProductPage();
    expect(fakeFetchCurrentProduct).toHaveBeenCalled();
    unmount();
    expect(fakeClearCurrentProduct).toBeCalled();
    expect(fakeClearCurrentComments).toBeCalled();
  });
});
