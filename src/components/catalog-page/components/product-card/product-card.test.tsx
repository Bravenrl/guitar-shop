import { fakeComments, fakeProduct } from '../../../../mock/fakeData';
import { Product } from '../../../../types/data';
import ProductCard from './product-card';
import { render, screen } from '@testing-library/react';
import { TestReg, WIP } from '../../../../const-test';
import userEvent from '@testing-library/user-event';
import { AppRoute } from '../../../../const';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { MockUSER } from '../../../../mock/mockStore';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();

const componentState = {
  USER: MockUSER,
};
const store = mockStore(componentState);
const RATING = 3;
const NAME = 'name';
const ID = 5;
const PRICE = 100;
const COUNT = fakeComments.length.toString();

const product: Product = {
  ...fakeProduct,
  rating: RATING,
  name: NAME,
  price: PRICE,
  id: ID,
};

describe('Component: ProductCard', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<ProductCard product={product} />}
            />
            <Route path={`/product/${ID}`} element={<h1>{WIP}</h1>} />
          </Routes>
        </BrowserRouter>
      </Provider>);
    expect(screen.getByText(NAME)).toBeInTheDocument();
    expect(screen.getByText(COUNT)).toBeInTheDocument();
    expect(screen.getByText(TestReg.AboutProduct)).toBeInTheDocument();
    userEvent.click(screen.getByText(TestReg.AboutProduct));
    expect(screen.getByText(TestReg.WipPage)).toBeInTheDocument();
  });
});
