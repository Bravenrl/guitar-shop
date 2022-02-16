import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import * as Redux from 'react-redux';
import { MockUSER } from '../../../../mock/mockStore';
import { customRenderWithProvider } from '../../../../render-test';
import { TestID, TestReg } from '../../../../const-test';
import CartFooter from './cart-footer';


const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');
const mockStore = configureMockStore();

const FakeInCart = {
  '1': 2,
  '3': 1,
};
const FAKE_DISCOUNT = 25;
const FAKE_TOTAL_PRICE = 100;
const FakeTotalPrice = {
  '1': 50,
  '3': 50,
};
const FakeCoupon = {
  value: 'medium-444',
  discount: 25,
};
const componentStateWithCoupon = {
  USER: { ...MockUSER, inCart: FakeInCart, totalPrice: FakeTotalPrice, coupon: FakeCoupon },
};

describe('Component: CartFooter', () => {
  it('should render correctly', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentStateWithCoupon);
    customRenderWithProvider(<CartFooter />, store);
    expect(screen.getByText(TestReg.CouponTitle)).toBeInTheDocument();
    expect(screen.getByText(TestReg.CouponBtn)).toBeInTheDocument();
    expect(screen.getByTestId(TestID.InputCoupon)).toBeInTheDocument();
    expect(screen.getAllByText(`${FAKE_TOTAL_PRICE} ₽`).length).toEqual(1);
    expect(screen.getByText(`${FAKE_DISCOUNT} ₽`)).toBeInTheDocument();
    expect(screen.getByText(`${FAKE_TOTAL_PRICE-FAKE_DISCOUNT} ₽`)).toBeInTheDocument();
    expect(screen.getByTestId(TestID.Discount)).toBeInTheDocument();
  });
});
