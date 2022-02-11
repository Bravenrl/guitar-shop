import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import { TestReg } from '../../../const-test';
import { MockDATA, MockUSER } from '../../../mock/mockStore';
import { customRenderWithProvider } from '../../../render-test';
import Header from './header';

const mockStore = configureMockStore();
const componentState = {
  DATA: MockDATA,
  USER: MockUSER,
};

const IN_CART = {
  '1': 5,
  '2': 5,
};
const TOTAL = 10;

describe('Component: Header', () => {
  it('should render correctly', () => {
    const store = mockStore(componentState);
    customRenderWithProvider(<Header/>, store);
    expect(screen.getByPlaceholderText(TestReg.SearchPlaceholder)).toBeInTheDocument();
    expect(screen.getByAltText(TestReg.Logo)).toBeInTheDocument();
    expect(screen.getByText(TestReg.About)).toBeInTheDocument();
    expect(screen.getByText(TestReg.Where)).toBeInTheDocument();
    expect(screen.getByText(TestReg.Catalog)).toBeInTheDocument();
    expect(screen.getByLabelText(TestReg.CartLabel)).toBeInTheDocument();
    expect(screen.queryByText(TOTAL)).not.toBeInTheDocument();
  });
  it('should render total in cart', () => {
    const store = mockStore({ ...componentState, USER: {...MockUSER, inCart: IN_CART } });
    customRenderWithProvider(<Header/>, store);
    expect(screen.getByText(TOTAL)).toBeInTheDocument();
  });
});
