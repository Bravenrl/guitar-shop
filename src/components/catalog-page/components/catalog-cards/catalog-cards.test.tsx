import { fakeProducts } from '../../../../mock/fakeData';
import CatalogCards from './catalog-cards';
import { screen} from '@testing-library/react';
import { TestReg } from '../../../../const-test';
import { customRenderWithProvider } from '../../../../render-test';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { MockDATA, MockUSER } from '../../../../mock/mockStore';

const mockStore = configureMockStore();
const componentState = {
  DATA: {...MockDATA, productsShow: fakeProducts, isLoading: false},
  USER: MockUSER,
};
const store = mockStore(componentState);

describe('Component: CatalogCards', () => {
  it('should render all product cards correctly', () => {
    customRenderWithProvider(<CatalogCards/>, store);
    expect(screen.queryAllByText(TestReg.AboutProduct).length).toEqual(fakeProducts.length);
  });
});
