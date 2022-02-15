import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import { TestReg } from '../../../const-test';
import { MockDATA, MockUSER } from '../../../mock/mockStore';
import { customRenderWithProvider } from '../../../render-test';
import CartLogo from './cart-logo';


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

describe('Component: CartLogo', () => {
  it('should render correctly', () => {
    const store = mockStore(componentState);
    customRenderWithProvider(<CartLogo/>, store);
    expect(screen.getByText(TestReg.ToCart)).toBeInTheDocument();
    expect(screen.queryByText(TOTAL)).not.toBeInTheDocument();
  });
  it('should render total in cart', () => {
    const store = mockStore({ ...componentState, USER: {...MockUSER, inCart: IN_CART } });
    customRenderWithProvider(<CartLogo/>, store);
    expect(screen.getByText(TOTAL)).toBeInTheDocument();
  });
});


