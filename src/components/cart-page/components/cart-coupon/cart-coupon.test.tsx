import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import { postCoupon } from '../../../../store/api-actions';
import { MockUSER } from '../../../../mock/mockStore';
import { customRenderWithProvider } from '../../../../render-test';
import { TestID, TestReg } from '../../../../const-test';
import CartCoupon from './cart-coupon';
import { CouponError } from '../../../../const';
import { clearCoupon } from '../../../../store/app-user/slice-app-user';

jest.mock('../../../../store/api-actions');

const fakePostCoupon = postCoupon as jest.MockedFunction<typeof postCoupon>;
const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const mockStore = configureMockStore();

const FakeCoupon = {
  value: 'medium-444',
  discount: 25,
};

const componentState = {
  USER: MockUSER,
};
const componentStateWithCoupon = {
  USER: { ...MockUSER, coupon: FakeCoupon },
};
const componentStateWithError = {
  USER: { ...MockUSER, coupon: CouponError },
};

const COUPON_WTH_SPACE ='   MedIum-444 ';
const COUPON_WTHOUT_SPACE ='medium-444';

describe('Component: CartCoupon', () => {
  it('should render correctly without validation message', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderWithProvider(<CartCoupon />, store);
    expect(screen.getByText(TestReg.CouponTitle)).toBeInTheDocument();
    expect(screen.getByText(TestReg.CouponBtn)).toBeInTheDocument();
    expect(screen.getByTestId(TestID.InputCoupon)).toBeInTheDocument();
    expect(screen.queryByText(TestReg.CouponRight)).not.toBeInTheDocument();
    expect(screen.queryByText(TestReg.CouponWrong)).not.toBeInTheDocument();
  });
  it('should render correctly with CouponRight validation message', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentStateWithCoupon);
    customRenderWithProvider(<CartCoupon />, store);
    expect(screen.getByText(TestReg.CouponTitle)).toBeInTheDocument();
    expect(screen.getByText(TestReg.CouponBtn)).toBeInTheDocument();
    expect(screen.getByText(TestReg.CouponRight)).toBeInTheDocument();
    expect(screen.queryByText(TestReg.CouponWrong)).not.toBeInTheDocument();
  });
  it('should render correctly with CouponWrong validation message', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentStateWithError);
    customRenderWithProvider(<CartCoupon />, store);
    expect(screen.getByText(TestReg.CouponTitle)).toBeInTheDocument();
    expect(screen.getByText(TestReg.CouponBtn)).toBeInTheDocument();
    expect(screen.getByText(TestReg.CouponWrong)).toBeInTheDocument();
    expect(screen.queryByText(TestReg.CouponRight)).not.toBeInTheDocument();
  });
  it('should dispatch correctly if click CouponBtn', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderWithProvider(<CartCoupon />, store);
    userEvent.type(screen.getByTestId(TestID.InputCoupon), COUPON_WTH_SPACE);
    userEvent.click(screen.getByText(TestReg.CouponBtn));
    expect(fakePostCoupon).toBeCalledTimes(1);
    expect(fakePostCoupon).toBeCalledWith(COUPON_WTHOUT_SPACE);
  });
  it('should render with coupon and clear dispatch correctly if clear input', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentStateWithCoupon);
    customRenderWithProvider(<CartCoupon />, store);
    expect(screen.getByTestId(TestID.InputCoupon)).toHaveValue(FakeCoupon.value);
    expect(screen.getByText(TestReg.CouponRight)).toBeInTheDocument();
    userEvent.clear(screen.getByTestId(TestID.InputCoupon));
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledWith(clearCoupon());
  });
});
