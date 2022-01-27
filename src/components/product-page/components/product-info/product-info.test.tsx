import { TestReg } from '../../../../const-test';
import { customRenderWithProvider } from '../../../../render-test';
import { screen } from '@testing-library/react';
import { CreateFakeGuitar, fakeComments } from '../../../../mock/fakeData';
import ProductInfo from './product-info';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { MockDATA, MockUSER } from '../../../../mock/mockStore';
import userEvent from '@testing-library/user-event';

const fakeCurrentProduct = CreateFakeGuitar();
const mockStore = configureMockStore();
const componentState = {
  DATA: {...MockDATA, currentComments: fakeComments},
  USER: MockUSER,
};
const store = mockStore(componentState);

describe('Component: ProductInfo', () => {
  it('should render & swich correctly', () => {
    customRenderWithProvider(<ProductInfo currentProduct = {fakeCurrentProduct}/>, store);
    expect(screen.getByText(TestReg.Characteristics)).toBeInTheDocument();
    expect(screen.getByText(TestReg.Description)).toBeInTheDocument();
    expect(screen.getByText(`${fakeCurrentProduct.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeCurrentProduct.vendorCode}`)).toBeInTheDocument();
    expect(screen.queryByText(`${fakeCurrentProduct.description}`)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(TestReg.Description));
    expect(screen.getByText(`${fakeCurrentProduct.description}`)).toBeInTheDocument();
    expect(screen.queryByText(`${fakeCurrentProduct.vendorCode}`)).not.toBeInTheDocument();
  });
});
