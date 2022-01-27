import { TestReg } from '../../../../const-test';
import { customRenderWithProvider } from '../../../../render-test';
import { screen } from '@testing-library/react';
import { CreateFakeGuitar, fakeComments } from '../../../../mock/fakeData';

import { configureMockStore } from '@jedmao/redux-mock-store';
import { MockDATA, MockUSER } from '../../../../mock/mockStore';
import ProductContainer from './product-container';

const fakeCurrentProduct = CreateFakeGuitar();
const mockStore = configureMockStore();
const componentState = {
  DATA: {...MockDATA, currentComments: fakeComments},
  USER: MockUSER,
};
const store = mockStore(componentState);

describe('Component: ProductContainer', () => {
  it('should render correctly', () => {
    customRenderWithProvider(<ProductContainer currentProduct = {fakeCurrentProduct}/>, store);
    expect(screen.getByText(TestReg.Characteristics)).toBeInTheDocument();
    expect(screen.getByText(TestReg.Description)).toBeInTheDocument();
    expect(screen.getByAltText(`${fakeCurrentProduct.name}`)).toBeInTheDocument();
    expect(screen.getByText(TestReg.Price)).toBeInTheDocument();
  });
});
