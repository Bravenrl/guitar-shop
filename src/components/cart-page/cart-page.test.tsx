import { screen } from '@testing-library/react';
import { Title } from '../../const';
import { customRenderWithProvider } from '../../render-test';
import CartPage from './cart-page';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { MockDATA, MockUSER } from '../../mock/mockStore';
import { fakeProduct } from '../../mock/fakeData';
import { HelmetProvider } from 'react-helmet-async';

HelmetProvider.canUseDOM = false;
const NAME = 'Product';
const ID = 1;
const fakeCurrentProduct = { ...fakeProduct, name: NAME, id: ID };
const componentState = {
  DATA: { ...MockDATA, currentProduct: fakeCurrentProduct },
  USER: MockUSER,
};
const mockStore = configureMockStore();
const store = mockStore(componentState);

describe('Component: CartPage', () => {
  it('should render correctly', () => {
    customRenderWithProvider(<CartPage />, store);
    expect(screen.getByText(Title.Cart)).toBeInTheDocument();
  });
});
