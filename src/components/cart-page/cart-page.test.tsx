import { render, screen } from '@testing-library/react';
import { AppRoute, Title } from '../../const';
import { customRenderWithProvider } from '../../render-test';
import CartPage from './cart-page';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { MockDATA, MockUSER } from '../../mock/mockStore';
import { fakeProduct } from '../../mock/fakeData';
import { HelmetProvider } from 'react-helmet-async';
import * as Redux from 'react-redux';
import { TestID, TestReg } from '../../const-test';
import { fetchCartProducts } from '../../store/api-actions';
import { createMemoryHistory } from 'history';
import { HistoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

HelmetProvider.canUseDOM = false;
const history = createMemoryHistory();
const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');
const mockStore = configureMockStore();
jest.mock('../../store/api-actions');

const fakeFetchCartProducts = fetchCartProducts as jest.MockedFunction<
  typeof fetchCartProducts
>;

const FIRST_NAME = 'Product1';
const FIRST_ID = 1;
const SECOND_NAME = 'Product2';
const SECOND_ID = 3;
const fakeFirstProduct = {
  ...fakeProduct,
  name: FIRST_NAME,
  id: FIRST_ID,
  price: 25,
};
const fakeSecondProduct = {
  ...fakeProduct,
  name: SECOND_NAME,
  id: SECOND_ID,
  price: 50,
};
const FakeInCart = {
  '1': 2,
  '3': 1,
};
const FAKE_IDS = ['1', '3'];
const FakeTotalPrice = {
  '1': 50,
  '3': 50,
};
const FakeCoupon = {
  value: 'medium-444',
  discount: 25,
};
const componentState = {
  DATA: {
    ...MockDATA,
    productsInCart: [fakeFirstProduct, fakeSecondProduct],
    isLoading: false,
  },
  USER: {
    ...MockUSER,
    inCart: FakeInCart,
    totalPrice: FakeTotalPrice,
    coupon: FakeCoupon,
  },
};

describe('Component: CartPage', () => {
  it('should render correctly with productsInCart', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderWithProvider(<CartPage />, store);
    expect(screen.getByText(Title.Cart)).toBeInTheDocument();
    expect(screen.getByText(TestReg.CouponTitle)).toBeInTheDocument();
    expect(screen.getAllByLabelText(TestReg.QuantAdd).length).toEqual(2);
    expect(screen.getAllByLabelText(TestReg.QuantRemove).length).toEqual(2);
    expect(screen.getByTestId(TestID.Discount)).toBeInTheDocument();
    expect(screen.getAllByTestId(TestID.Quantity).length).toEqual(2);
    expect(screen.getByText(TestReg.OrderBtn)).toBeInTheDocument();
    expect(screen.getByAltText(FIRST_NAME)).toBeInTheDocument();
    expect(screen.getByAltText(SECOND_NAME)).toBeInTheDocument();
  });
  it('should dispatch async actions when mount and reset actions when unmount', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderWithProvider(<CartPage />, store);
    expect(fakeFetchCartProducts).toBeCalledTimes(1);
    expect(fakeFetchCartProducts).toHaveBeenCalledWith(FAKE_IDS);
  });
  it('should render NoProduct', () => {
    history.push(`/${AppRoute.Cart}`);
    useDispatch.mockReturnValue(dispatch);
    const emptyState = {
      DATA: { ...MockDATA, isLoading: false },
      USER: MockUSER,
    };
    const store = mockStore(emptyState);
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route path={AppRoute.Root} />
              <Route path={`/${AppRoute.Cart}`} element={<CartPage />} />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);
    expect(screen.getByText(TestReg.CartNoProduct)).toBeInTheDocument();
    expect(screen.queryByText(TestReg.CouponTitle)).not.toBeInTheDocument();
  });
});
