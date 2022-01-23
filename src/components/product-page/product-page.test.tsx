import { screen } from '@testing-library/react';
import { customRenderWithProvider } from '../../render-test';
import ProductPage from './product-page';
import { HelmetProvider } from 'react-helmet-async';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { MockDATA, MockUSER } from '../../mock/mockStore';
import { fakeProduct } from '../../mock/fakeData';

HelmetProvider.canUseDOM = false;

const mockStore = configureMockStore();
const NAME = 'Product';
const ID = 1;
const fakeCurrentProduct = { ...fakeProduct, name: NAME, id: ID };
const componentState = {
  DATA: { ...MockDATA, currentProduct: fakeCurrentProduct },
  USER: MockUSER,
};
const store = mockStore(componentState);

window.scrollTo = jest.fn();
describe('Component: ProductPage', () => {
  it('should render correctly', () => {
    customRenderWithProvider(<ProductPage />, store);
    expect(screen.getAllByText(NAME).length).toEqual(2);
  });
});
